import React, { useState, useEffect } from "react";
import { fetchReports } from "../services/reportsService";
import { Table } from "react-bootstrap"; // Import React Bootstrap components

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportsData = await fetchReports();
        // Check if reportsData is an array or an object and handle accordingly
        if (Array.isArray(reportsData)) {
          setReports(reportsData);
        } else {
          // Handle case if reportsData is not an array, e.g. handle error or display a message
          setReports([reportsData]); // Wrap the object into an array (if it's a single object)
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    loadReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className="container-fluid">
      <div className="row">
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
                {reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr key={index}>
                      <td>{report.report_id || "N/A"}</td>
                      <td>{report.type || "N/A"}</td>
                      <td>{report.date || "N/A"}</td>
                      <td>{report.data || "No data available"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
