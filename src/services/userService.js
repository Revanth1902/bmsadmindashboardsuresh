import axios from "axios";

const API_URL = "https://bmsbackend-u3gc.onrender.com/api/admin/api/admin";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data.users; // Extract the 'users' array from the response data
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`);
  return response.data;
};
