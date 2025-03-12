import axios from "axios";

// API URL to interact with the backend
const API_URL = "https://bmsbackend-u3gc.onrender.com/api/admin/api/admin";

// Fetch all theatres
export const fetchTheatres = async () => {
  try {
    const response = await axios.get(`${API_URL}/theatres`);
    return response.data.theatres; // Return the list of theatres
  } catch (error) {
    console.error("Error fetching theatres:", error);
    throw error;
  }
};

// Get details of a specific theatre by ID
export const fetchTheatreById = async (theatreId) => {
  try {
    const response = await axios.get(`${API_URL}/theatres/${theatreId}`);
    return response.data.theatre; // Return the specific theatre data
  } catch (error) {
    console.error(`Error fetching theatre by ID ${theatreId}:`, error);
    throw error;
  }
};

// Add a new theatre
export const addTheatre = async (theatreData) => {
  try {
    const response = await axios.post(`${API_URL}/theatres`, theatreData);
    return response.data; // Return the response from adding a new theatre
  } catch (error) {
    console.error("Error adding new theatre:", error);
    throw error;
  }
};

// Delete a theatre
export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axios.delete(`${API_URL}/theatres/${theatreId}`);
    return response.data; // Return success or failure response
  } catch (error) {
    console.error(`Error deleting theatre with ID ${theatreId}:`, error);
    throw error;
  }
};
