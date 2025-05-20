import React from "react";
import "./Loader.css";

const MovieLoader = () => {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <div className="movie-loader-wrapper">
        <div className="reel">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="film-strip"></div>
        </div>
        <p className="loading-text">Loading Showtime...</p>
      </div>
    </div>
  );
};

export default MovieLoader;
