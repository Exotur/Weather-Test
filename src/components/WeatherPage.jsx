import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WeatherPage() {
  const { city } = useParams(); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '482a9a4938166d6461739ea0e59caa99'; 

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setError('');
        })
        .catch((err) => {
          setError(err.message);
          setWeatherData(null);
        });
    }
  }, [city, apiKey]);

  return (
    <div>
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>Wetter in {weatherData.name}</h2>
          <p>Temperatur: {weatherData.main.temp}°C</p>
          <p>Wetter: {weatherData.weather[0].description}</p>
          <p>Luftfeuchtigkeit: {weatherData.main.humidity}%</p>
          <p>Windgeschwindigkeit: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;