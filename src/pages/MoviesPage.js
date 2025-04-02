import React, { useState, useEffect } from "react";
import { fetchMovies, deleteMovie } from "../services/movieService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddEditMovieModal from "../components/AddEditMovieModel";
import { Spinner } from "react-bootstrap"; // For loader

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for page data

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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s"; // Set fallback image on error
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="text-dark">Movies</h1>
        <button onClick={handleAdd} className="btn btn-primary">
          <FaEdit className="mr-2" />
          Add New Movie
        </button>
      </div>

      {/* Loader while movies are being fetched */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Movie ID</th>
                <th>Poster</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Director</th>
                <th>Release Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie._id}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={
                          movie.image_url ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s"
                        }
                        alt={movie.title}
                        onError={handleImageError} // Handle broken image
                        className="movie-image"
                      />
                    </div>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.director}</td>
                  <td>
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="btn btn-warning mr-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.movie_id)}
                      className="btn btn-danger"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Movie Modal */}
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
