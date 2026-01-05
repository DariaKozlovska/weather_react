import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CityCard from '../components/CityCard';
import SearchBar from '../components/SearchBar';
import { CITIES } from '../constants/cities';
import { searchCityByName } from '../services/weatherServices';
import { setUnit } from '../slices/unitSlice'; 

const Home = () => {
  const [cities, setCities] = useState(CITIES);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const unit = useSelector(state => state.unit.unit);

  const handleSearch = useCallback(async () => {
    if (!query) return;

    try {
      const response = await searchCityByName(query);
      console.log('API RESPONSE:', response.data);

      const newCity = {
        id: response.data.id,
        name: response.data.name,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
        temp: Math.round(response.data.main.temp),
        icon: response.data.weather[0].icon,
      };

      setCities(prev => {
        const exists = prev.some(c => c.id === newCity.id);
        return exists ? prev : [...prev, newCity];
      });

      setError(null);
      setQuery('');
    } catch {
      setError('Nie znaleziono miejscowości');
    }
  }, [query]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const loadInitialTemps = async () => {
      const updated = await Promise.all(
        CITIES.map(async city => {
          try {
            const res = await searchCityByName(city.name);
            return {
              ...city,
              temp: Math.round(res.data.main.temp),
              icon: res.data.weather[0].icon,
            };
          } catch {
            return city;
          }
        })
      );

      setCities(updated);
    };

    loadInitialTemps();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-indigo-950 text-white p-6 relative">
      <div className="absolute top-6 right-6 flex gap-2">
        {['C', 'F', 'K'].map(u => (
          <button
            key={u}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
              unit === u
                ? 'bg-blue-600 text-white'
                : 'bg-white/20 hover:bg-white/30'
            }`}
            onClick={() => dispatch(setUnit(u))}
          >
            {u}°
          </button>
        ))}
      </div>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Pogoda</h1>
        <p>Sprawdź pogodę w swoich ulubionych miastach</p>
      </header>

      <div className="max-w-xl mx-auto mb-6">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        {error && (
          <p
            className="
              mt-4 mx-auto max-w-md text-center
              text-white bg-red-500/20 border border-red-400/40
              px-4 py-2 rounded-lg
              transition-all duration-300
              opacity-100 translate-y-0
            "
          >
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-10">
        {cities.map(city => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Home;