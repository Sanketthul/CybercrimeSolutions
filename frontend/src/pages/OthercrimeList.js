import React from "react";
import "./CSS/Othercrime.css";

function OthercrimeList({ crimeReports }) {
  return (
    <div className="container">
      <h2>Submitted Reports</h2>
      <div className="crime-list">
        <ul>
          {crimeReports.map((report, index) => (
            <li key={index}>
              <strong>{report.name}</strong> ({report.email})
              <br />
              {report.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OthercrimeList;
