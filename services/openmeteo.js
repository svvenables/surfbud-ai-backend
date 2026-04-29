import fetch from "node-fetch";

export default async function getOpenMeteoForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wind_speed_10m,wind_direction_10m`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    waveHeight: data.hourly.wave_height,
    waveDirection: data.hourly.wave_direction,
    windSpeed: data.hourly.wind_speed_10m,
    windDirection: data.hourly.wind_direction_10m,
    timestamps: data.hourly.time
  };
}
