import React from 'react';
import { getWindDirection } from '../constants/windDirections';

const ForecastCard = ({ forecast }) => {
  const { dt_txt, main, weather, pop, wind, rain, snow } = forecast;

  let precipitationType = 'Brak';
  let precipitationAmount = 0;

  if (rain && rain['3h']) {
    precipitationType = 'Deszcz';
    precipitationAmount = rain['3h'];
  } else if (snow && snow['3h']) {
    precipitationType = 'Śnieg';
    precipitationAmount = snow['3h'];
  }

  const windDirection = getWindDirection(wind.deg);

  return (
    <div style={{
      border: '1px solid #ccc', 
      borderRadius: 8, 
      padding: 12, 
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}>
      <img
        alt="weather"
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        style={{ width: 50, height: 50 }}
      />
      <div>
        <p>{new Date(dt_txt).toLocaleDateString()}</p>
        <p>Temp: {main.temp} °C</p>
        <p>Opady: {pop * 100}%</p>
        <p>{precipitationType} ({precipitationAmount} mm)</p>
        <p>Wiatr: {wind.speed} m/s, {windDirection}</p>
      </div>
    </div>
  );
};

export default ForecastCard;