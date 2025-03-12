import axios from "axios";

const API_URL = "https://bmsbackend-u3gc.onrender.com/api/movies";

export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await axios.post(`${API_URL}/addmovies`, movieData);
  return response.data;
};

export const updateMovie = async (movieId, movieData) => {
  const response = await axios.put(`${API_URL}/update/${movieId}`, movieData);
  return response.data;
};

export const deleteMovie = async (movieId) => {
  const response = await axios.delete(`${API_URL}/delete/${movieId}`);
  return response.data;
};
