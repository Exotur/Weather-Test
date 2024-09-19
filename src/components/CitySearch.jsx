import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <div className="city-search">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter a city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CitySearch;
// neuer commit denke das wir das