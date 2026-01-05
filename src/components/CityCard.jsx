import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { convertTemperature } from '../hooks/useTemperature';

const CityCard = ({ city }) => {
  const navigate = useNavigate();
  const unit = useSelector(state => state.unit.unit); // globalna jednostka

  const handleClick = () => {
    navigate(`/details/${city.id}`, { state: city });
  };

  // przelicz temperaturę na wybraną jednostkę
  const displayTemp = city.temp !== undefined ? convertTemperature(city.temp, unit).toFixed(1) : '--';

  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer
        p-6 rounded-2xl
        bg-linear-to-br from-white/20 to-white/5
        backdrop-blur-md
        border border-white/20
        shadow-lg
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-2xl
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-white">{city.name}</h3>

          {city.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
              alt="weather icon"
              className="w-10 h-10 brightness-0 invert opacity-90"
            />
          )}
        </div>

        <span className="text-2xl font-bold text-white">
          {displayTemp}°{unit}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-white/70 text-sm">
        <span>Zobacz szczegóły</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </div>
  );
};

CityCard.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    temp: PropTypes.number,
    icon: PropTypes.string,
    lat: PropTypes.number,
    lon: PropTypes.number,
  }).isRequired,
};

export default CityCard;