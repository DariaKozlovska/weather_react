import './Details.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../slices/weatherSlice';
import { CITIES } from '../constants/cities';
import { getDailyForecast } from '../functions/getDailyForecast';
import ForecastCard from '../components/ForecastCard';
import { getWindDirection } from '../constants/windDirections';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const city = CITIES.find((c) => c.id === Number(id));
  const { current, forecast, loading } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    if (city) dispatch(fetchWeather(city));
  }, [dispatch, city]);

  if (loading) return <p>Ładowanie...</p>;
  if (!current) return null;

  return (
    <div>
      <h1>{city.name}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h2>{current.main.temp} °C</h2>
        <img
          alt="weather"
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        />
      </div>
      <p>{current.weather[0].description}</p>
      <p>Wiatr: {current.wind.speed} m/s, Kierunek: {getWindDirection(current.wind.deg)}</p>
      <p>Zachmurzenie: {current.clouds.all} %</p>

      <h3>Prognoza (5 dni)</h3>
      {getDailyForecast(forecast).map((item, index) => (
        <ForecastCard key={index} forecast={item} />
      ))}
    </div>
  );
};

export default Details;