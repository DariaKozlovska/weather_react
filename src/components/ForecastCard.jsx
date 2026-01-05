import PropTypes from 'prop-types';
import { getWindDirection } from '../constants/windDirections';
import { convertTemperature } from '../hooks/useTemperature';

const ForecastCard = ({ forecast, unit }) => {
  return (
    <div className="
      bg-white/5 backdrop-blur-md p-4 rounded-xl
      flex flex-col items-center text-white
      shadow-lg transition-all duration-300 
    ">
      <p className="text-sm text-white/60 mb-2">{forecast.dt_txt.split(' ')[0]}</p>

      <img
        alt="icon"
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        className="w-16 h-16 mb-2 brightness-0 invert opacity-90"
      />

      <p className="text-2xl font-bold mb-1">
        {convertTemperature(forecast.main.temp, unit).toFixed(1)}°{unit}
      </p>

      <p className="text-white/70 text-sm">
        Opady: {Math.round(forecast.pop * 100)}%
      </p>

      {forecast.rain?.['3h'] && (
        <p className="text-white/70 text-sm">Deszcz: {forecast.rain['3h']} mm</p>
      )}
      {forecast.snow?.['3h'] && (
        <p className="text-white/70 text-sm">Śnieg: {forecast.snow['3h']} mm</p>
      )}

      <p className="text-white/70 text-sm mt-1">
        Wiatr: {forecast.wind.speed} m/s ({getWindDirection(forecast.wind.deg)})
      </p>
    </div>
  );
};

ForecastCard.propTypes = {
  unit: PropTypes.oneOf(['C', 'F', 'K']).isRequired,
  forecast: PropTypes.shape({
    dt_txt: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    pop: PropTypes.number.isRequired,
    rain: PropTypes.shape({
      '3h': PropTypes.number,
    }),
    snow: PropTypes.shape({
      '3h': PropTypes.number,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
      deg: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ForecastCard;