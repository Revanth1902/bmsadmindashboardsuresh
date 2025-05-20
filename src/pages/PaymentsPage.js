import React, { useState, useEffect } from "react";
import { fetchPayments, refundPayment } from "../services/paymentsService";
import { Button, Table, Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2"; // Import chart components
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      // Dummy data
      const paymentsData = [
        {
          payment_id: "1",
          user_id: "101",
          amount: 100,
          date: "2025-05-15",
          status: "Completed",
        },
        {
          payment_id: "2",
          user_id: "102",
          amount: 250,
          date: "2025-05-14",
          status: "Pending",
        },
        {
          payment_id: "3",
          user_id: "103",
          amount: 300,
          date: "2025-05-13",
          status: "Failed",
        },
        {
          payment_id: "4",
          user_id: "104",
          amount: 150,
          date: "2025-05-12",
          status: "Completed",
        },
        {
          payment_id: "5",
          user_id: "105",
          amount: 50,
          date: "2025-05-11",
          status: "Pending",
        },
      ];
      setPayments(paymentsData);
    };
    loadPayments();
  }, []);

  const handleRefund = async (paymentId) => {
    // Simulate refund process
    await refundPayment(paymentId);
    setPayments(payments.filter((payment) => payment.payment_id !== paymentId));
  };

  const handleRefundAll = async () => {
    // Simulate refunding all payments
    const refundPromises = payments.map((payment) =>
      refundPayment(payment.payment_id)
    );
    await Promise.all(refundPromises);
    setPayments([]); // Remove all payments after refunding
  };

  // Payment status stats
  const statusCounts = payments.reduce((acc, payment) => {
    acc[payment.status] = (acc[payment.status] || 0) + 1;
    return acc;
  }, {});

  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);

  const statusPieData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Payment Status",
        data: statusData,
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  // Payment amount statistics
  const totalAmount = payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  const averageAmount = totalAmount / payments.length || 0;

  // Chart for payment amounts by user
  const userPaymentData = {
    labels: payments.map((payment) => `User ${payment.user_id}`),
    datasets: [
      {
        label: "Payment Amount by User",
        data: payments.map((payment) => payment.amount),
        backgroundColor: "#3f51b5",
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        {/* Add your sidebar here */}

        {/* Main content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="text-primary mb-4">Payments</h1>

          {/* Statistics section */}
          <Row className="mb-4">
            <Col md={4}>
              <div className="stats-wrapper text-center">
                <h5>Total Payments</h5>
                <h3>{payments.length}</h3>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-wrapper text-center">
                <h5>Total Amount</h5>
                <h3>${totalAmount}</h3>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-wrapper text-center">
                <h5>Average Payment</h5>
                <h3>${averageAmount.toFixed(2)}</h3>
              </div>
            </Col>
          </Row>

          {/* Charts Section: Pie and Bar charts side by side */}
          <Row className="mb-4">
            <Col md={6}>
              <div
                className="bg-white rounded-lg shadow-sm p-4"
                style={{ height: "300px", overflow: "hidden" }} // Set height and prevent overflow
              >
                <h5 className="text-center">Payment Status Distribution</h5>
                <div style={{ height: "100%" }}>
                  <Pie data={statusPieData} options={{ responsive: true }} />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="bg-white rounded-lg shadow-sm p-4"
                style={{ height: "300px", overflow: "hidden" }} // Set height and prevent overflow
              >
                <h5 className="text-center">Payments by User</h5>
                <div style={{ height: "100%" }}>
                  <Bar
                    data={userPaymentData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* Payments Table */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <Table striped bordered hover responsive>
              <thead className="thead-dark">
                <tr>
                  <th>Payment ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td>{payment.payment_id}</td>
                    <td>{payment.user_id}</td>
                    <td>${payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.status}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRefund(payment.payment_id)}
                      >
                        Refund
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Button to refund all payments */}
            <div className="d-flex justify-content-end mt-3">
              <Button variant="danger" size="lg" onClick={handleRefundAll}>
                Refund All Payments
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
