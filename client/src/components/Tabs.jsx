import { useEffect, useState } from "react";
import AllMovies from "./AllMovies";
import AllTVShows from "./AllTVShows";
import { Link } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";

const API_KEY = "960e6e053522ff335cc5a9a2e8e57196";
const BASE_URL = "https://api.themoviedb.org/3";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const [movieRes, tvRes] = await Promise.all([
        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
      ]);
      const movieJson = await movieRes.json();
      const tvJson = await tvRes.json();
      setMovieGenres(movieJson.genres);
      setTvGenres(tvJson.genres);
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setShowGenreDropdown(false);
    setSearchQuery(""); // Reset search if genre selected
    setSearchResults([]);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const [movieRes, tvRes] = await Promise.all([
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`),
        fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`),
      ]);

      const [movieData, tvData] = await Promise.all([
        movieRes.json(),
        tvRes.json(),
      ]);

      const combinedResults = [
        ...movieData.results.map((item) => ({ ...item, type: "movie" })),
        ...tvData.results.map((item) => ({ ...item, type: "tv" })),
      ];

      setSearchResults(combinedResults.sort((a, b) => b.popularity - a.popularity));
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        movieGenres={movieGenres}
        tvGenres={tvGenres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        showGenreDropdown={showGenreDropdown}
        setShowGenreDropdown={setShowGenreDropdown}
        handleGenreClick={handleGenreClick}
      />

      {/* SEARCH RESULTS */}
      {searchResults.length > 0 ? (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchResults.map((item) => (
            <Link
              key={item.id}
              to={`/${item.type === "movie" ? "movie" : "tv"}/${item.id}`}
              className="bg-white rounded shadow hover:scale-105 transition"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full rounded-t"
              />
              <div className="p-2 text-black">
                <h3 className="text-sm font-semibold truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {item.type === "movie" ? "Movie" : "TV Show"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <>
          {activeTab === "movies" ? (
            <AllMovies searchQuery={searchQuery} selectedGenre={selectedGenre} />
          ) : activeTab === "tv" ? (
            <AllTVShows searchQuery={searchQuery} selectedGenre={selectedGenre} />
          ) : (
            <div className="text-center bg-black text-xl text-white">
              <Home />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tabs;
