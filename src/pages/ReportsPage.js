import React, { useState, useEffect } from "react";
import { fetchReports } from "../services/reportsService";
import { Table } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./ReportsPage.css"; // Optional: for external styling

// Register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportsData = await fetchReports();
        if (Array.isArray(reportsData)) {
          setReports(reportsData);
        } else {
          setReports([reportsData]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  // Dummy chart data
  const ticketsData = {
    labels: ["Movie A", "Movie B", "Movie C", "Movie D"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [120, 200, 150, 300],
        backgroundColor: "#1976d2",
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue (in $1000)",
        data: [25, 40, 35, 60, 55],
        backgroundColor: "#43a047",
      },
    ],
  };

  const profitLossData = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#388e3c", "#d32f2f"],
      },
    ],
  };

  const paymentStatusData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#0288d1", "#fbc02d"],
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-fluid reports-page">
      <div className="row">
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="text-primary mb-4">Reports Dashboard</h1>

          {/* Graphs */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4">
              <h5>Tickets Sold per Movie</h5>
              <Bar data={ticketsData} />
            </div>

            <div className="col-md-6 mb-4">
              <h5>Monthly Revenue</h5>
              <Bar data={revenueData} />
            </div>

            <div className="col-md-6 mb-4">
              <h5>Profit vs Loss</h5>
              <Pie data={profitLossData} />
            </div>

            <div className="col-md-6 mb-4">
              <h5>Payment Status</h5>
              <Pie data={paymentStatusData} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h5 className="mb-3">Raw Reports Table</h5>
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
