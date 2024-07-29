import { useState } from "react";
import "./App.css";

function App() {
  const api = {
    key: "20e5f17a755f2398eab3551777325685",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4">
      <h1 className="text-5xl font-bold mb-8">Weather App by Sarthak</h1>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter City Name..."
          className="p-4 w-64 focus:ring focus:ring-blue-300 border border-gray-300 rounded-lg shadow-lg text-black"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={searchPressed}
          className="p-4 bg-blue-700 hover:bg-blue-800 rounded-lg shadow-lg font-semibold transition duration-200"
        >
          Search
        </button>
      </div>

      {weather.main && weather.weather && (
        <div className="bg-white bg-opacity-20 rounded-lg p-8 shadow-lg text-center w-80">
          <p className="text-2xl font-bold">{weather.name}</p>
          <p className="text-4xl font-semibold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-xl">{weather.weather[0].main}</p>
          <p className="text-md">{weather.weather[0].description}</p>
        </div>
      )}

      {weather.cod === "404" && (
        <p className="text-center text-red-500 mt-8">
          City not found. Please enter a valid city name.
        </p>
      )}
    </div>
  );
}

export default App;
