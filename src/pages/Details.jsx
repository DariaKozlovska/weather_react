import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeather } from '../slices/weatherSlice';
import ForecastCard from '../components/ForecastCard';
import { getDailyForecast } from '../functions/getDailyForecast';
import { useTemperatureUnit, convertTemperature } from '../hooks/useTemperature';
import { getWindDirection } from '../constants/windDirections';
import WeatherStats from '../components/WeatherStat';
import { setUnit } from '../slices/unitSlice'; 

const Details = () => {
  const { state: city } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current, forecast, loading, error } = useSelector(state => state.weather);
  const unit = useSelector(state => state.unit.unit);
  const [view, setView] = useState('current');

  useEffect(() => {
    if (city?.lat && city?.lon) {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city]);

  const today = new Date().toISOString().split('T')[0];

  const dailyForecast = useMemo(() => {
    if (!forecast) return [];

    const daysMap = new Map();

    forecast.forEach(item => {
      const day = item.dt_txt.split(' ')[0];
      if (day === today) return; 
      if (!daysMap.has(day) || item.dt_txt.includes('12:00:00')) {
        daysMap.set(day, item);
      }
    });

    return Array.from(daysMap.values());
  }, [forecast]);

  if (!city) return <div className="min-h-screen flex items-center justify-center text-white">Nie znaleziono miasta</div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Ładowanie danych pogodowych…</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-300">{error}</div>;
  if (!current) return null;

  const currentTemp = convertTemperature(current.main.temp, unit);
  const feelsLike = convertTemperature(current.main.feels_like, unit);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-indigo-950 text-white p-6">
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-white/70 hover:text-white transition"
        >
          ← Powrót
        </button>

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

        <h1 className="text-4xl font-bold mb-2">{city.name}</h1>
        <p className="text-white/60 mb-8">Aktualne informacje pogodowe</p>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView('current')}
            className={`px-4 py-2 rounded-lg transition ${
              view === 'current' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Aktualna pogoda
          </button>

          <button
            onClick={() => setView('forecast')}
            className={`px-4 py-2 rounded-lg transition ${
              view === 'forecast' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Prognoza 5 dni
          </button>
        </div>

        {view === 'current' && (
          <>
            <div className="flex items-center gap-6 mb-10">
              <img
                alt="weather icon"
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                className="w-20 h-20 brightness-0 invert opacity-90"
              />
              <div>
                <p className="text-5xl font-bold">{currentTemp.toFixed(1)}°{unit}</p>
                <p className="text-white/70 mt-1">
                  Odczuwalna: {feelsLike.toFixed(1)}°{unit}
                </p>
              </div>
            </div>

            <WeatherStats current={current} unit={unit} />
          </>
        )}

        {view === 'forecast' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {dailyForecast.map(item => (
              <ForecastCard key={item.dt} forecast={item} unit={unit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;