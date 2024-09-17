
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitySearch from './components/CitySearch';
import WeatherPage from './components/WeatherPage';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Wetter-App</h1>

        <Routes>
          <Route path="/" element={<CitySearch />} />
          <Route path="/weather/:city" element={<WeatherPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
