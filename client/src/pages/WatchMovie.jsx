// pages/WatchMovie.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WatchMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 pt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to Details
      </button>

      <div className="w-full max-w-6xl aspect-video shadow-lg rounded overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://vidsrc.to/embed/movie/${id}`}
          allowFullScreen
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="Watch Movie"
        ></iframe>
      </div>
    </div>
  );
}
