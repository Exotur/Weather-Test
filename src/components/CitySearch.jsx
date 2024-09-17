// src/CitySearch.js
import{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CitySearch() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Stadt eingeben..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Suchen</button>



    </div>
  );
}


