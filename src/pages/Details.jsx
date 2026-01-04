import './Details.css';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeather } from '../slices/weatherSlice';
import { CITIES } from '../constants/cities';
import { getDailyForecast } from '../functions/getDailyForecast';
import {
  convertTemperature,
  useTemperatureUnit,
} from '../hooks/useTemperature';

import ForecastCard from '../components/ForecastCard';


const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🌡 jednostka temperatury z Reduxa (hook użyty RAZ)
  const unit = useTemperatureUnit();

  // 🏙 miasto na podstawie parametru z URL
  const city = CITIES.find((c) => c.id === Number(id));

  // 🌤 dane pogodowe z Reduxa
  const { current, forecast, loading, error } = useSelector(
    (state) => state.weather
  );

  const [view, setView] = useState('current'); // 'current' | 'forecast'

  // 📡 pobranie danych pogodowych
  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city]);

  // 📅 prognoza 5-dniowa (useMemo)
  const dailyForecast = useMemo(
    () => (forecast?.length ? getDailyForecast(forecast) : []),
    [forecast]
  );

  // 🛡 zabezpieczenia renderu
  if (!city) return <p>Nie znaleziono miasta</p>;
  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;
  if (!current) return null;

  // 🌡 bieżąca temperatura
  const currentTemp = convertTemperature(current.main.temp, unit);

  return (
    <div className="details">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Wróć do listy
      </button>

      <h1>{city.name}</h1>

      <div className="view-switcher">
        <button
          className={view === 'current' ? 'active' : ''}
          onClick={() => setView('current')}
        >
          Aktualna pogoda
        </button>

        <button
          className={view === 'forecast' ? 'active' : ''}
          onClick={() => setView('forecast')}
        >
          Prognoza 5 dni
        </button>
      </div>

      {view === 'current' && (
        <div className="current-weather">
          <div className="current-main">
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            />
            <h2>
              {currentTemp.toFixed(1)} °{unit}
            </h2>
          </div>

          <p>{current.weather[0].description}</p>
          <p>Wiatr: {current.wind?.speed} m/s</p>
          <p>Zachmurzenie: {current.clouds.all}%</p>
        </div>
      )}

      {view === 'forecast' && (
        <>
          <h3>Prognoza (5 dni)</h3>
          <div className="forecast-list">
            {dailyForecast.map((item) => (
              <ForecastCard
                key={item.dt}
                forecast={item}
                unit={unit}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;