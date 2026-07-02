export async function getWeather(lat, lon) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  const data = await res.json();

  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind: data.wind.speed,
    rain: data.rain?.["1h"] || 0,
    condition: data.weather[0].main,
  };
}