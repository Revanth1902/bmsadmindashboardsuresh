import React, { useState, useEffect } from "react";
import { fetchMovies, deleteMovie } from "../services/movieService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddEditMovieModal from "../components/AddEditMovieModel";
import MovieLoader from "./MovieLoader";
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
import "./MoviesPage.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleDelete = async (movieId) => {
    await deleteMovie(movieId);
    setMovies(movies.filter((movie) => movie.movie_id !== movieId));
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedMovie(null);
    setOpenModal(true);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s";
  };

  // Chart Data
  const genreCounts = {};
  movies.forEach((movie) => {
    genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1;
  });

  const genreLabels = Object.keys(genreCounts);
  const genreData = Object.values(genreCounts);

  const barChartData = {
    labels: genreLabels,
    datasets: [
      {
        label: "Number of Movies",
        data: genreData,
        backgroundColor: "#1976d2",
      },
    ],
  };

  const pieChartData = {
    labels: genreLabels,
    datasets: [
      {
        label: "Genres",
        data: genreData,
        backgroundColor: [
          "#f44336",
          "#3f51b5",
          "#4caf50",
          "#ff9800",
          "#9c27b0",
          "#00bcd4",
        ],
      },
    ],
  };

  return (
    <div className="movies-page container mt-4">
      {loading ? (
        <div style={{ padding: "2rem" }}>
          <MovieLoader />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">🎬 Movie Management</h2>
            <button onClick={handleAdd} className="btn btn-success">
              <FaEdit className="mr-2" />
              Add New Movie
            </button>
          </div>

          {/* Charts Section */}
          <div className="row mb-4">
            {/* Bar Chart */}
            <div className="col-md-4 mb-4">
              <div className="chart-wrapper">
                <h5 className="mb-3 text-center">🎬 Movies by Genre</h5>
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                    maintainAspectRatio: false,
                  }}
                  height={200}
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="col-md-4 mb-4">
              <div className="chart-wrapper">
                <h5 className="mb-3 text-center">📊 Genre Distribution</h5>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "bottom" } },
                    maintainAspectRatio: false,
                  }}
                  height={200}
                />
              </div>
            </div>

            {/* Stats Card */}
            <div className="col-md-4 mb-4">
              <div className="stats-card">
                <h5 className="mb-3 text-center">📅 Release Stats</h5>
                <div>
                  Total Movies: <strong>{movies.length}</strong>
                </div>
                <div>
                  Today’s Releases:{" "}
                  <strong>
                    {
                      movies.filter(
                        (movie) =>
                          new Date(movie.release_date).toDateString() ===
                          new Date().toDateString()
                      ).length
                    }
                  </strong>
                </div>
                <div>
                  Past Releases:{" "}
                  <strong>
                    {
                      movies.filter(
                        (movie) => new Date(movie.release_date) < new Date()
                      ).length
                    }
                  </strong>
                </div>
                <div>
                  Upcoming Releases:{" "}
                  <strong>
                    {
                      movies.filter(
                        (movie) => new Date(movie.release_date) > new Date()
                      ).length
                    }
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-responsive bg-white p-4 rounded shadow-sm">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Movie ID</th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Director</th>
                  <th>Release Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie._id}</td>
                    <td className="text-center">
                      <img
                        src={
                          movie.image_url ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s"
                        }
                        alt={movie.title}
                        onError={handleImageError}
                        className="movie-poster"
                      />
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.director}</td>
                    <td>
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie.movie_id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {openModal && (
        <AddEditMovieModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          movie={selectedMovie}
          onMovieSaved={(newMovies) => setMovies(newMovies)}
        />
      )}
    </div>
  );
};

export default MoviesPage;
