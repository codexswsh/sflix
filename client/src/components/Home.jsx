import React from "react";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-[#001F3F] to-[#001a33] text-white flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Background Blur/Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-2 py-1 rounded">
            Stream
          </div>
          <div className="text-3xl font-bold bg-blue-600 px-2 py-1 rounded">
            Flix
          </div>
        </div>

        {/* Site Name */}
        <h1 className="text-2xl font-semibold">HDToday</h1>

        {/* Search Bar */}
        {/* <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter keywords..."
            className="w-full px-4 py-3 rounded-lg text-black text-base focus:outline-none shadow"
          />
        </div> */}

        {/* Search Bar */}
        <div className="w-full max-w-3xl relative mt-6">
          <input
            type="text"
            placeholder="Enter keywords..."
            className="w-full px-5 py-4 rounded-lg text-white border-2 text-lg focus:outline-none shadow-md pr-14"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            🔍
          </button>
        </div>

        {/* Social Shares */}
        <div className="flex flex-wrap justify-center gap-2 text-sm mt-4">
          <span className="text-gray-300 mr-2">2.5k Shares</span>
          <button className="bg-[#3b5998] px-4 py-1 rounded">f 241</button>
          <button className="bg-black px-4 py-1 rounded">X 454</button>
          <button className="bg-green-500 px-4 py-1 rounded">💬 736</button>
          <button className="bg-blue-500 px-4 py-1 rounded">💭 700</button>
          <button className="bg-orange-600 px-4 py-1 rounded">🧡 87</button>
          <button className="bg-cyan-600 px-4 py-1 rounded">✈️</button>
        </div>

        {/* View Full Site Button */}
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg">
          View Full Site →
        </button>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import Row from "../components/Row";

// const API_KEY = "960e6e053522ff335cc5a9a2e8e57196";
// const BASE_URL = "https://api.themoviedb.org/3";

// const Home = () => {
//   const [rows, setRows] = useState({});

//   const fetchRow = async (title, endpoint) => {
//     const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
//     const data = await res.json();
//     return { title, movies: data.results };
//   };

//   useEffect(() => {
//     const loadRows = async () => {
//       const categories = [
//         { title: "Because you watched HIT: The Third Case", endpoint: "/movie/popular" },
//         { title: "Swoonworthy Korean Series", endpoint: "/discover/tv?with_original_language=ko" },
//         { title: "Deep, Dark and Dreary", endpoint: "/discover/movie?with_genres=53" }, // genre 53 = Thriller
//       ];

//       const fetched = await Promise.all(
//         categories.map((cat) => fetchRow(cat.title, cat.endpoint))
//       );

//       const dataObj = {};
//       fetched.forEach(({ title, movies }) => {
//         dataObj[title] = movies;
//       });

//       setRows(dataObj);
//     };

//     loadRows();
//   }, []);

//   return (
//     <div className="bg-black min-h-screen pt-4">
//       {Object.entries(rows).map(([title, movies]) => (
//         <Row key={title} title={title} movies={movies} />
//       ))}
//     </div>
//   );
// };

// export default Home;
