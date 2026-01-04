import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeather } from '../slices/weatherSlice';
import ForecastCard from '../components/ForecastCard';
import { getDailyForecast } from '../functions/getDailyForecast';
import {
  useTemperatureUnit,
  convertTemperature,
} from '../hooks/useTemperature';

import './Details.css';

const Details = () => {
  const { state: city } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current, forecast, loading, error } = useSelector(
    (state) => state.weather
  );

  const unit = useTemperatureUnit();
  const [view, setView] = useState('current');

  useEffect(() => {
    if (city?.lat && city?.lon) {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city]);

  const dailyForecast = useMemo(
    () => getDailyForecast(forecast),
    [forecast]
  );

  if (!city) {
    return <p>Nie znaleziono miasta</p>;
  }

  if (loading) {
    return <p>Ładowanie danych pogodowych...</p>;
  }

  if (!current) {
    return null;
  }

  const currentTemp = convertTemperature(current.main.temp, unit);

  return (
    <div className="details">
      <button className="back-button" onClick={() => navigate(-1)}>
        Powrót
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
          <img
            alt="weather"
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          />

          <h2>
            {currentTemp.toFixed(1)} °{unit}
          </h2>

          <p>{current.weather[0].description}</p>
          <p>Wiatr: {current.wind.speed} m/s</p>
          <p>Zachmurzenie: {current.clouds.all}%</p>
        </div>
      )}

      {view === 'forecast' && (
        <div className="forecast-list">
          {dailyForecast.map((item) => (
            <ForecastCard
              key={item.dt}
              forecast={item}
              unit={unit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;