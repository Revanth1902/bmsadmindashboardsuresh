import axios from "axios";

const API_URL = "https://bmsbackend-u3gc.onrender.com/api/admin/api/admin";

export const fetchPayments = async () => {
  const response = await axios.get(`${API_URL}/payments`);
  return response.data.payments;
};

export const refundPayment = async (paymentId) => {
  const response = await axios.post(`${API_URL}/payments/${paymentId}/refund`);
  return response.data;
};
