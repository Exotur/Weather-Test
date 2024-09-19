import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitySearch from './components/CitySearch';
import LocationWeather from './components/LocationWeather';
import WeatherPage from './components/WeatherPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [location, setLocation] = useState(null);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleUnit = () => setUnit(unit === 'metric' ? 'imperial' : 'metric');

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location: ", error);
      }
    );
  }, []);

  if (!location) {
    return <div>Loading location...</div>;
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Router>
        <header className="header">
          <h1>Weather App</h1>
          <div className="controls">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <button onClick={toggleUnit}>
              {unit === 'metric' ? '°F' : '°C'}
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
            <LocationWeather unit={unit} location={location} />
              <CitySearch />
              
            </>
          } />
          <Route path="/weather/:city" element={<WeatherPage unit={unit} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
