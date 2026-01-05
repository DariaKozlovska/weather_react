import PropTypes from 'prop-types';
import { convertTemperature } from '../hooks/useTemperature';
import { getWindDirection } from '../constants/windDirections';
import rainIcon from '../assets/icons/rainy.png';
import windIcon from '../assets/icons/wind.png';
import cloudIcon from '../assets/icons/cloud.png';

const WeatherStats = ({ current, unit }) => {
  // Obliczenia opadów
  const precipitationChance = Math.round((current.pop ?? 0) * 100);
  const rainAmount = current.rain?.['1h'] ?? 0;
  const snowAmount = current.snow?.['1h'] ?? 0;

  let precipitationType = 'Brak';
  if (rainAmount > 0) precipitationType = 'Deszcz';
  if (snowAmount > 0) precipitationType = 'Śnieg';

  const precipitationAmount = (rainAmount + snowAmount).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
      {/* Wiatr */}
      <div className="flex-1 bg-white/5 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-white shadow-lg transition">
        <img src={windIcon} alt="Wiatr" className="w-8 h-8 p-1" />
        <span className="font-semibold">Wiatr</span>
        <span className="text-xl font-bold">
          {current.wind.speed} m/s ({getWindDirection(current.wind.deg)})
        </span>
      </div>

      {/* Zachmurzenie */}
      <div className="flex-1 bg-white/5 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-white shadow-lg transition">
        <img src={cloudIcon} alt="Zachmurzenie" className="w-10 h-10" />
        <span className="font-semibold">Zachmurzenie</span>
        <span className="text-xl font-bold">{current.clouds.all}%</span>
      </div>

      {/* Opady */}
      <div className="flex-1 bg-white/5 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-white shadow-lg transition">
        <img src={rainIcon} alt="Opady" className="w-8 h-8 " />
        <span className="font-semibold">Opady</span>
        <span className="text-xl font-bold">
          {precipitationChance}% • {precipitationType} {precipitationAmount} mm/m²
        </span>
      </div>
    </div>
  );
};

WeatherStats.propTypes = {
  current: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
};

export default WeatherStats;