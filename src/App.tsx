import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    if (!city) return;
    fetchWeather(city, days);
  };

  return (
    <div className="app-container">
      <h2>🌦️ Weather Forecast App</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-box"
        />

        <input
          type="number"
          min={1}
          max={7}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="days-input"
        />

        <button onClick={handleSearch} className="btn">
          Get Weather
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default App;
