import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WeatherPage = ({ unit }) => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '482a9a4938166d6461739ea0e59caa99'; 

  useEffect(() => {
    if (!city || !unit) {
      setError("Stadt oder Einheit ist nicht definiert.");
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error("Fehler beim Abrufen der Wetterdaten.");
        }
        return resp.json();
      })
      .then(data => {
        setWeatherData(data);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching weather data: ", err);
        setError("Fehler beim Abrufen der Wetterdaten.");
      });
  }, [city, unit]);

  if (error) return <p>{error}</p>;
  if (!weatherData) return <p>Loading weather...</p>;

  const { main, weather, wind, name } = weatherData;
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description} />
      <p>{weather[0].description}</p>
      <div className="temperature">
        {Math.round(main.temp)}{tempUnit}
      </div>
      <div className="details">
        <span>Wind: {wind.speed} {windSpeedUnit}</span>
        <span>Humidity: {main.humidity}%</span>
      </div>
    </div>
  );
};

export default WeatherPage;
