import React, { useState, useEffect } from "react";
import { fetchReports } from "../services/reportsService";
import { Table, Button } from "react-bootstrap"; // Import React Bootstrap components

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const reportsData = await fetchReports();
      setReports(reportsData);
    };
    loadReports();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        {/* <div className="col-md-3 col-lg-2 bg-dark text-white p-4">
          <h2 className="text-center mb-4">Dashboard</h2>
          <ul className="list-unstyled">
            <li>
              <a
                href="#"
                className="text-white text-decoration-none hover-text-light"
              >
                Home
              </a>
            </li>
            <li className="mt-3">
              <a
                href="#"
                className="text-white text-decoration-none hover-text-light"
              >
                Reports
              </a>
            </li>
          </ul>
        </div> */}

        {/* Main content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="text-primary mb-4">Reports</h1>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <Table striped bordered hover responsive>
              <thead className="thead-dark">
                <tr>
                  <th>Report ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.report_id}>
                    <td>{report.report_id}</td>
                    <td>{report.type}</td>
                    <td>{report.date}</td>
                    <td>{report.data}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
