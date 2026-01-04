import { useState, useCallback } from 'react';
import CityCard from '../components/CityCard';
import SearchBar from '../components/searchBar';
import { CITIES } from '../constants/cities';
import { searchCityByName } from '../services/weatherServices';
import './Home.css';

const Home = () => {
  const [cities, setCities] = useState(CITIES);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!query) return;

    try {
      const response = await searchCityByName(query);

      const newCity = {
        id: response.data.id,
        name: response.data.name,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      };

      setCities((prev) => {
        const exists = prev.some((c) => c.id === newCity.id);
        return exists ? prev : [...prev, newCity];
      });

      setError(null);
      setQuery('');
    } catch (err) {
      setError('Nie znaleziono miejscowości');
    }
  }, [query]);

  return (
    <div className="home">
      <h1>Lista miejscowości</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
      />

      {error && <p className="error">{error}</p>}

      <div className="city-list">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Home;