import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tabs from "./components/Tabs"; // Your new tab component
import MovieDetails from "./components/MovieDetails";
import TVShowDetails from "./components/TVShowDetails";
import WatchMovie from "./pages/WatchMovie";
import WatchTV from "./pages/WatchTV";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/movies" element={<Tabs />} />  {/* Optional: /movies loads Tabs */}
        <Route path="/tv" element={<Tabs />} />      {/* Optional: /tv loads Tabs */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TVShowDetails />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/watch/tv/:id" element={<WatchTV />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
