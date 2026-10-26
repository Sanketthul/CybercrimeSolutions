import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/admin.css";

const STATUSES = [
  "Submitted",
  "Under review",
  "Verified",
  "Rejected",
  "Guidance provided",
  "Closed",
];

export default function AdminHome({ userData }) {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [activeTab, setActiveTab] = useState("complaints");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [responseNotes, setResponseNotes] = useState({});

  const navigate = useNavigate();

  const loadDashboard = useCallback(async () => {
    setError("");

    try {
      const [complaintResponse, userResponse] = await Promise.all([
        api.get("/api/othercrime"),
        api.get("/getAllUser"),
      ]);

      setComplaints(
        Array.isArray(complaintResponse.data) ? complaintResponse.data : [],
      );

      setUsers(
        Array.isArray(userResponse.data?.data) ? userResponse.data.data : [],
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Dashboard data could not be loaded. Please sign in again if your session expired.",
      );
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const counts = useMemo(
    () => ({
      total: complaints.length,

      pending: complaints.filter((item) =>
        ["Submitted", "Under review", "Under Review"].includes(item.status),
      ).length,

      progress: complaints.filter((item) =>
        ["Verified", "Guidance provided"].includes(item.status),
      ).length,

      resolved: complaints.filter((item) => item.status === "Closed").length,
    }),
    [complaints],
  );

  const visibleComplaints = useMemo(
    () =>
      complaints.filter((item) => {
        const matchesStatus =
          filter === "All statuses" || item.status === filter;

        const needle = query.trim().toLowerCase();

        const matchesQuery =
          !needle ||
          [
            item.trackingId,
            item.name,
            item.email,
            item.category,
            item.message,
          ].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(needle),
          );

        return matchesStatus && matchesQuery;
      }),
    [complaints, filter, query],
  );

  const updateStatus = async (id, status) => {
    setBusyId(id);
    setError("");

    const note = (responseNotes[id] || "").trim();

    try {
      await api.patch(`/api/othercrime/${id}/status`, {
        status,
        note,
      });

      setResponseNotes((current) => ({
        ...current,
        [id]: "",
      }));

      await loadDashboard();
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Could not update the report status.",
      );
    } finally {
      setBusyId("");
    }
  };

  const deleteUser = async (user) => {
    if (
      !window.confirm(
        `Delete the account for ${user.fname} ${user.lname || ""}? This cannot be undone.`,
      )
    ) {
      return;
    }

    setError("");

    try {
      await api.delete(`/users/${user._id}`);

      setUsers((current) => current.filter((item) => item._id !== user._id));
    } catch (requestError) {
      setError(
        requestError.response?.data?.error || "Could not delete this account.",
      );
    }
  };

  const logOut = () => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("loggedIn");
    navigate("/sign-in", { replace: true });
  };

  const pageTitle =
    activeTab === "users" ? "User management" : "Incident dashboard";

  const pageDescription =
    activeTab === "users"
      ? "Manage registered accounts and review account information."
      : "Monitor incoming reports and keep case progress up to date.";

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">CS</span>
          <span>
            Cybercrime<strong>Solutions</strong>
          </span>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <button
          className={
            activeTab === "complaints" ? "side-link active" : "side-link"
          }
          onClick={() => setActiveTab("complaints")}
        >
          ▤ <span>Complaints</span>
          <span className="side-count">{complaints.length}</span>
        </button>

        <button
          className={activeTab === "users" ? "side-link active" : "side-link"}
          onClick={() => setActiveTab("users")}
        >
          ♙ <span>User management</span>
        </button>

        <div className="sidebar-bottom">
          <div className="admin-avatar">
            {(userData?.fname || "A").slice(0, 1).toUpperCase()}
          </div>

          <div className="admin-user">
            <strong>{userData?.fname || "Administrator"}</strong>
            <span>Administrator</span>
          </div>

          <button
            className="logout-link"
            onClick={logOut}
            aria-label="Sign out"
            title="Sign out"
          >
            ↗
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <div className="admin-eyebrow">SECURITY OPERATIONS / OVERVIEW</div>

            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
          </div>

          <div className="topbar-actions">
            <button className="refresh-button" onClick={loadDashboard}>
              ↻ Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="admin-alert" role="alert">
            {error}

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              style={{
                marginLeft: "12px",
                cursor: "pointer",
                border: 0,
                background: "transparent",
                color: "inherit",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {activeTab === "complaints" && (
          <div className="metric-grid">
            <article className="metric-card">
              <div className="metric-icon navy">▤</div>
              <span>Total reports</span>
              <strong>{counts.total}</strong>
              <small>All submitted incidents</small>
            </article>

            <article className="metric-card">
              <div className="metric-icon amber">◷</div>
              <span>Needs attention</span>
              <strong>{counts.pending}</strong>
              <small>Submitted or under review</small>
            </article>

            <article className="metric-card">
              <div className="metric-icon blue">↗</div>
              <span>In progress</span>
              <strong>{counts.progress}</strong>
              <small>Currently being handled</small>
            </article>

            <article className="metric-card">
              <div className="metric-icon green">✓</div>
              <span>Resolved / closed</span>
              <strong>{counts.resolved}</strong>
              <small>Completed cases</small>
            </article>
          </div>
        )}

        {activeTab === "complaints" ? (
          <section className="admin-panel">
            <div className="panel-heading">
              <div>
                <h2>Recent reports</h2>
                <p>Review incidents, search records and update their status.</p>
              </div>

              <span className="record-count">
                {visibleComplaints.length} records
              </span>
            </div>

            <div className="table-tools">
              <label className="search-box">
                ⌕{" "}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ID, name, email or category"
                />
              </label>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option>All statuses</option>

                {STATUSES.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Complainant</th>
                    <th>Incident</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Update status</th>
                    <th>Admin response</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleComplaints.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <strong className="tracking-code">
                          {item.trackingId || "Legacy report"}
                        </strong>
                      </td>

                      <td>
                        <strong>{item.name}</strong>
                        <small>{item.email}</small>
                      </td>

                      <td>
                        <strong>{item.category || "Other cybercrime"}</strong>
                        <p className="incident-summary">{item.message}</p>
                      </td>

                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "—"}
                      </td>

                      <td>
                        <span
                          className={`admin-status status-${(
                            item.status || "Submitted"
                          )
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {item.status || "Submitted"}
                        </span>
                      </td>

                      <td>
                        <select
                          aria-label={`Update ${item.trackingId || "report"} status`}
                          disabled={busyId === item._id}
                          value={
                            STATUSES.includes(item.status)
                              ? item.status
                              : "Submitted"
                          }
                          onChange={(event) => {
                            updateStatus(item._id, event.target.value);
                          }}
                        >
                          {!STATUSES.includes(item.status) && (
                            <option value="Submitted" disabled>
                              Legacy: {item.status}
                            </option>
                          )}

                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="admin-response-cell">
                        <textarea
                          rows="3"
                          maxLength="500"
                          value={responseNotes[item._id] || ""}
                          onChange={(event) =>
                            setResponseNotes((current) => ({
                              ...current,
                              [item._id]: event.target.value,
                            }))
                          }
                          placeholder="Explain the decision or provide next steps…"
                          aria-label={`Admin response for ${item.trackingId || "report"}`}
                        />

                        <small>
                          This response will be visible to the report submitter.
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {visibleComplaints.length === 0 && (
                <div className="empty-state">
                  <span>⌕</span>
                  <strong>No reports found</strong>
                  <p>Try changing the search term or status filter.</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="admin-panel">
            <div className="panel-heading">
              <div>
                <h2>Registered users</h2>
                <p>
                  Account details only. Password hashes are never returned by
                  this API.
                </p>
              </div>

              <span className="record-count">{users.length} users</span>
            </div>

            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <strong>
                          {user.fname} {user.lname}
                        </strong>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span className="admin-status">{user.userType}</span>
                      </td>

                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "—"}
                      </td>

                      <td>
                        <button
                          className="danger-button"
                          disabled={user._id === userData?._id}
                          onClick={() => deleteUser(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <div className="empty-state">No registered users found.</div>
              )}
            </div>
          </section>
        )}

        <footer className="admin-footer">
          <span>Cybercrime Solutions · Internal workspace</span>
          <span>Case data is restricted to authorized staff.</span>
        </footer>
      </section>
    </main>
  );
}
