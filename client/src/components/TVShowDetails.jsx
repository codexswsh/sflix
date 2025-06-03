import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "960e6e053522ff335cc5a9a2e8e57196";
const BASE_URL = "https://api.themoviedb.org/3";

export default function TVShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setShow(data);

        const videoRes = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Failed to fetch TV show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!show) return <p className="text-center mt-10">TV Show not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">{show.name}</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w400${show.poster_path}`}
            alt={show.name}
            className="rounded shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow">
          <div className="mb-6">
            <p className="mb-4 text-lg">{show.overview || "No description available."}</p>
            <p><strong>First Air Date:</strong> {show.first_air_date}</p>
            <p><strong>Rating:</strong> {show.vote_average} / 10</p>
            <p><strong>Genres:</strong> {show.genres?.map(g => g.name).join(", ")}</p>
            <p><strong>Number of Seasons:</strong> {show.number_of_seasons}</p>
            <p><strong>Number of Episodes:</strong> {show.number_of_episodes}</p>
          </div>

          {trailerKey ? (
            <div className="mb-6 aspect-video w-full rounded overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="TV Show Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="mb-6 text-gray-600">Trailer not available.</p>
          )}

          {/* Watch Show Button */}
          <div>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => navigate(`/watch/tv/${id}`)}
            >
              Watch Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
