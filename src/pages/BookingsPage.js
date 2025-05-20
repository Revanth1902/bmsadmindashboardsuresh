import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Row,
  Col,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap"; // Import Bootstrap components
import { Bar, Pie } from "react-chartjs-2"; // Importing Chart.js components
import { Chart as ChartJS } from "chart.js/auto"; // Chart.js auto-registration

// Dummy data
const dummyBookings = [
  {
    booking_id: 1,
    user_id: 101,
    theatre_name: "Theatre A",
    show_time: "2025-05-25 20:00",
    seats: ["A1", "A2", "A3"],
  },
  {
    booking_id: 2,
    user_id: 102,
    theatre_name: "Theatre B",
    show_time: "2025-05-26 18:30",
    seats: ["B1", "B2"],
  },
  {
    booking_id: 3,
    user_id: 103,
    theatre_name: "Theatre C",
    show_time: "2025-05-27 22:00",
    seats: ["C1", "C2", "C3", "C4"],
  },
  {
    booking_id: 4,
    user_id: 104,
    theatre_name: "Theatre A",
    show_time: "2025-05-28 17:00",
    seats: ["D1", "D2"],
  },
];

const statsData = {
  totalBookings: 1500,
  cancelledBookings: 200,
  totalUsers: 1200,
  totalRevenue: 35000,
};

const barChartData = {
  labels: ["Theatre A", "Theatre B", "Theatre C", "Theatre D"],
  datasets: [
    {
      label: "Bookings per Theatre",
      data: [500, 400, 300, 200],
      backgroundColor: ["#42a5f5", "#66bb6a", "#ff7043", "#ab47bc"],
    },
  ],
};

const pieChartData = {
  labels: ["Cancelled", "Active", "Pending"],
  datasets: [
    {
      data: [200, 1200, 100],
      backgroundColor: ["#f44336", "#4caf50", "#ff9800"],
    },
  ],
};

const AdminDashboard = () => {
  const [bookings, setBookings] = useState(dummyBookings);
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
    setShowCancelModal(false);
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setSelectedBooking(null);
    setShowCancelModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Overview Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text>{statsData.totalBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{statsData.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>${statsData.totalRevenue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Cancelled Bookings</Card.Title>
              <Card.Text>{statsData.cancelledBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphs */}
      <Row className="mb-4">
        <Col md={6}>
          <div
            className="bg-white rounded-lg shadow-sm p-4"
            style={{ height: "300px" }}
          >
            <h5 className="text-center">Bookings per Theatre</h5>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </Col>
        <Col md={6}>
          <div
            className="bg-white rounded-lg shadow-sm p-4"
            style={{ height: "300px" }}
          >
            <h5 className="text-center">Booking Status</h5>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </Col>
      </Row>

      {/* Booking Table */}
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Theatre</th>
            <th>Show Time</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.theatre_name}</td>
              <td>{booking.show_time}</td>
              <td>{booking.seats.join(", ")}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => openCancelModal(booking)}
                  className="btn-sm"
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Booking Cancellation */}
      <Modal show={showCancelModal} onHide={closeCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel the booking for{" "}
          <strong>{selectedBooking?.theatre_name}</strong> on{" "}
          <strong>{selectedBooking?.show_time}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCancelModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleCancelBooking(selectedBooking?.booking_id)}
          >
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Action Buttons */}
      <div className="mt-4 text-center">
        <Button variant="primary" className="mx-2">
          Add New Movie
        </Button>
        <Button variant="secondary" className="mx-2">
          Manage Users
        </Button>
        <Button variant="info" className="mx-2">
          View Reports
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
