import React, { useState, useEffect } from "react";
import { fetchBookings, cancelBooking } from "../services/bookingsService";
import { Button, Table } from "react-bootstrap"; // Import Bootstrap components

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const bookingsData = await fetchBookings();
      setBookings(bookingsData);
    };
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    await cancelBooking(bookingId);
    setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Bookings</h1>
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
                  onClick={() => handleCancel(booking.booking_id)}
                  className="btn-sm"
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingsPage;
