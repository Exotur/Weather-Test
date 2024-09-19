import { useEffect, useState } from 'react';

const LocationWeather = ({ unit, location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const apiKey = '482a9a4938166d6461739ea0e59caa99'; 

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          console.log('Fetching weather data for location:', location);
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&units=${unit}&appid=${apiKey}`
          );

          if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Wetterdaten');
          }

          const data = await response.json();
          console.log('Weather data received:', data);
          setWeatherData(data.current);
          setDailyWeather(data.daily);
        } catch (error) {
          console.error('Fehler beim Abrufen der Wetterdaten:', error);
        }
      };

      fetchWeatherData();
    }
  }, [location, unit]);

  if (!weatherData) {
    return <div>Wetterdaten werden geladen...</div>;
  }

  return (
    <div className="weather-card">
      <h2>Aktuelles Wetter</h2>
      <div className="temperature">
        {Math.round(weatherData.temp)}°{unit === 'metric' ? 'C' : 'F'}
      </div>
      <p>{weatherData.weather[0].description}</p>

      <div className="details">
        <p>Wind: {weatherData.wind_speed} m/s</p>
        <p>Luftfeuchtigkeit: {weatherData.humidity}%</p>
      </div>

      <h3>7-Tage-Vorhersage</h3>
      <div className="forecast">
        {dailyWeather.map((day, index) => (
          <div key={index} className="daily-forecast">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{Math.round(day.temp.day)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationWeather;