import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_KEY = "960e6e053522ff335cc5a9a2e8e57196";
const BASE_URL = "https://api.themoviedb.org/3";

export default function WatchTV() {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setTVShow(data);
        setSeasons(data.seasons || []);
      } catch (error) {
        console.error("Failed to fetch TV show:", error);
      }
    };

    fetchTVShow();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${id}/season/${selectedSeason}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setEpisodes(data.episodes || []);
        if (data.episodes?.length > 0) {
          setSelectedEpisode(data.episodes[0].episode_number);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
        setLoading(false);
      }
    };

    if (selectedSeason) {
      fetchEpisodes();
    }
  }, [id, selectedSeason]);

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white p-4 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-300 rounded hover:bg-blue-400"
      >
        ← Back to Details
      </button>

      <h1 className="text-3xl font-bold mb-4">{tvShow?.name}</h1>

      {/* Season Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setSelectedSeason(season.season_number)}
            className={`px-3 py-1 rounded-full border ${
              selectedSeason === season.season_number
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Season {season.season_number}
          </button>
        ))}
      </div>

      {/* Episode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {episodes.map((episode) => (
          <button
            key={episode.id}
            onClick={() => setSelectedEpisode(episode.episode_number)}
            className={`px-3 py-1 rounded-full border ${
              selectedEpisode === episode.episode_number
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Ep {episode.episode_number}
          </button>
        ))}
      </div>

      {/* Now Playing Info */}
      {episodes.length > 0 && (
        <div className="mb-4 text-white bg-gray-800 px-4 py-2 rounded-lg shadow text-sm md:text-base">
          <strong>Now Playing:</strong> Season {selectedSeason} • Episode{" "}
          {selectedEpisode} –{" "}
          <span className="italic">
            {episodes.find((e) => e.episode_number === selectedEpisode)?.name ||
              "Untitled"}
          </span>
        </div>
      )}

      {/* Video Player */}
      <div className="aspect-video w-full rounded overflow-hidden shadow-lg">
        {episodes.length > 0 && (
          <iframe
            className="w-full h-full"
            src={`https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`}
            title="TV Show Player"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
