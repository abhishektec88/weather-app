import React from "react";
import type { WeatherData } from "../types";
import "./WeatherCard.css";

interface Props {
  data: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  console.log("data", data)
  return (
    <div className="weather-card">
      <h3>{data.city}</h3>
      <p>🌡️ Current: {data.current}°C</p>
      <h4>Next {data.dates.length} Days Forecast:</h4>
      <ul className="forecast-list">
        {data.dates.map((date, index) => (
          <li key={date}>
            <span>{new Date(date).toDateString()}</span>
            <span>🔺 Max: {data.max[index]}°C</span>
            <span>🔻 Min: {data.min[index]}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherCard;
