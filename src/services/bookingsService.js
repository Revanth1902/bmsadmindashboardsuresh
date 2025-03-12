import axios from "axios";

const API_URL = "https://bmsbackend-u3gc.onrender.com/api/admin";

export const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
  return response.data;
};
