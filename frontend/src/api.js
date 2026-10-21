import axios from "axios";

const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Each browser tab has its own sessionStorage.
  const token = window.sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.sessionStorage.getItem("token")
    ) {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("loggedIn");
    }

    return Promise.reject(error);
  },
);

export default api;
