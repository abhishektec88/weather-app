import { useState } from "react";
import type { WeatherData } from "../types";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string, days: number) => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&forecast_days=${days}`
      );
      const weatherData = await weatherRes.json();

      const result: WeatherData = {
        city: `${name}, ${country}`,
        current: weatherData.current_weather.temperature,
        min: weatherData.daily.temperature_2m_min.slice(0, days),
        max: weatherData.daily.temperature_2m_max.slice(0, days),
        dates: weatherData.daily.time.slice(0, days),
      };

      setWeather(result);
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
