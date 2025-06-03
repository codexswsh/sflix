// components/Row.jsx
import React from "react";
import { Link } from "react-router-dom";

const Row = ({ title, movies = [] }) => {
  return (
    <div className="mb-6">
      <h2 className="text-white text-xl font-semibold mb-2 px-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-thin">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/${movie.media_type || "movie"}/${movie.id}`}
            className="flex-shrink-0 w-36 sm:w-40"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title || movie.name}
              className="w-full h-auto rounded"
            />
            <p className="text-white text-sm mt-1 truncate text-center">{movie.title || movie.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Row;
