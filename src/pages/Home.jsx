import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CityCard from '../components/CityCard';
import SearchBar from '../components/SearchBar';
import { CITIES } from '../constants/cities';
import { searchCityByName } from '../services/weatherServices';
import { setUnit } from '../slices/unitSlice';
import starIcon from '../assets/icons/star.png';

const Home = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]); // ⬅️ TYLKO DANE Z API

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unit = useSelector(state => state.unit.unit);
  const favorites = useSelector(state => state.favorites.cities);

  /* ===== MERGE: CITIES + FAVORITES ===== */
  const mergedCities = useMemo(() => {
    return [
      ...CITIES,
      ...favorites.filter(
        fav => !CITIES.some(city => city.id === fav.id)
      ),
    ];
  }, [favorites]);

  /* ===== LOAD WEATHER FOR ALL CITIES ===== */
  useEffect(() => {
    const loadWeather = async () => {
      const updated = await Promise.all(
        mergedCities.map(async city => {
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

    loadWeather();
  }, [mergedCities]);

  /* ===== SEARCH ===== */
  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    try {
      const res = await searchCityByName(query);

      const newCity = {
        id: res.data.id,
        name: res.data.name,
        lat: res.data.coord.lat,
        lon: res.data.coord.lon,
        temp: Math.round(res.data.main.temp),
        icon: res.data.weather[0].icon,
      };

      setCities(prev => {
        const exists = prev.some(c => c.id === newCity.id);
        return exists ? prev : [...prev, newCity];
      });

      setQuery('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Nie znaleziono miejscowości');
    }
  }, [query]);

  /* ===== ERROR AUTO HIDE ===== */
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-indigo-950 text-white p-6 relative">
      {/* TOP RIGHT BUTTONS */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <div className="flex gap-2">
          {['C', 'F', 'K'].map(u => (
            <button
              key={u}
              onClick={() => dispatch(setUnit(u))}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                unit === u
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {u}°
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/favorites')}
          className="
            px-3 py-2 rounded-lg font-semibold
            bg-linear-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            transition shadow-md flex items-center gap-2 justify-center
          "
        >
          <img src={starIcon} alt="Gwiazda" className="h-4 w-4" />
          <span>Ulubione</span>
        </button>
      </div>

      {/* HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Pogoda</h1>
        <p>Sprawdź pogodę w swoich ulubionych miastach</p>
      </header>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        {error && (
          <p className="mt-4 text-center bg-red-500/20 border border-red-400/40 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}
      </div>

      {/* CITY LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
        {cities.map(city => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Home;