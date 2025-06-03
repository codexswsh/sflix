import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "960e6e053522ff335cc5a9a2e8e57196";
const BASE_URL = "https://api.themoviedb.org/3";

function AllMovies({ searchQuery, selectedGenre }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";

      if (searchQuery) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&with_genres=${selectedGenre}`;
      } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    };

    fetchMovies();
  }, [searchQuery, selectedGenre]);

  const goToDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300"
            onClick={() => goToDetails(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm truncate">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMovies;
