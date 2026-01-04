import './ForecastCard.css';
import { getWindDirection } from '../constants/windDirections';
import { convertTemperature } from '../hooks/useTemperature';

const ForecastCard = ({ forecast, unit }) => {
  return (
    <div className="forecast-card">
      <p>{forecast.dt_txt.split(' ')[0]}</p>

      <img
        alt="icon"
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
      />

      <p>
        {convertTemperature(forecast.main.temp, unit).toFixed(1)} °{unit}
      </p>

      <p>Opady: {Math.round(forecast.pop * 100)}%</p>

      {forecast.rain?.['3h'] && (
        <p>Deszcz: {forecast.rain['3h']} mm</p>
      )}
      {forecast.snow?.['3h'] && (
        <p>Śnieg: {forecast.snow['3h']} mm</p>
      )}

      <p>
        Wiatr: {forecast.wind.speed} m/s (
        {getWindDirection(forecast.wind.deg)})
      </p>
    </div>
  );
};

export default ForecastCard;