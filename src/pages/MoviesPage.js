import React, { useState, useEffect } from "react";
import { fetchMovies, deleteMovie } from "../services/movieService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddEditMovieModal from "../components/AddEditMovieModel";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
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

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1 className="text-center text-dark mb-4">Movies</h1>
        <button onClick={handleAdd} className="btn btn-primary mb-4">
          <FaEdit className="mr-2" />
          Add New Movie
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Movie ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Director</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.movie_id}>
                <td>{movie.movie_id}</td>
                <td>
                  <img src={movie.image_url} alt={movie.title} />
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

                <td>
                  <button
                    onClick={() => handleEdit(movie)}
                    className="btn btn-warning mr-2"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
