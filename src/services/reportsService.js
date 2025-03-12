import axios from "axios";

const API_URL = "https://bmsbackend-u3gc.onrender.com/api/admin";

export const fetchReports = async () => {
  const response = await axios.get(`${API_URL}/reports`);
  return response.data;
};
