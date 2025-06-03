import { useState } from "react";

const Navbar = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  handleSearch,
  movieGenres,
  tvGenres,
  selectedGenre,
  setSelectedGenre,
  showGenreDropdown,
  setShowGenreDropdown,
  handleGenreClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const genres = activeTab === "movies" ? movieGenres : tvGenres;

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md relative">
      <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
        {/* Left: Logo and links */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1
            onClick={() => {
              setActiveTab("home");
              setSelectedGenre("");
              setSearchQuery("");
              setShowGenreDropdown(false);
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-2 py-1 rounded cursor-pointer"
          >
            Stream 
          </h1>
          <h1><span className="text-2xl font-bold bg-blue-600 px-2 py-1 rounded">&nbsp; Flix</span></h1>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Menu & search */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-6 w-full md:w-auto`}
        >
          {/* Links */}
          <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:items-center">
            <button
              onClick={() => {
                setActiveTab("home");
                setSelectedGenre("");
                setSearchQuery("");
                setShowGenreDropdown(false);
                setMobileMenuOpen(false);
              }}
              className={`hover:text-red-500 ${
                activeTab === "home" ? "text-red-500" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab("movies");
                setSelectedGenre("");
                setSearchQuery("");
                setShowGenreDropdown(false);
                setMobileMenuOpen(false);
              }}
              className={`hover:text-red-500 ${
                activeTab === "movies" ? "text-red-500" : ""
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => {
                setActiveTab("tv");
                setSelectedGenre("");
                setSearchQuery("");
                setShowGenreDropdown(false);
                setMobileMenuOpen(false);
              }}
              className={`hover:text-red-500 ${
                activeTab === "tv" ? "text-red-500" : ""
              }`}
            >
              TV Shows
            </button>

            {/* Genre dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                className="hover:text-red-500"
              >
                Genre ▼
              </button>

              {showGenreDropdown && (
                <div className="absolute z-20 mt-2 w-48 bg-white text-black rounded shadow-lg max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      handleGenreClick("");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        handleGenreClick(genre.id);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-3 md:mt-0 px-4 py-2 rounded bg-white text-black w-full md:w-72"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
