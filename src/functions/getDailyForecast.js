export const getDailyForecast = (forecastList) => {
  const daily = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD

    // wybieramy prognozę około południa
    if (item.dt_txt.includes('12:00:00')) {
      daily[date] = item;
    }
  });

  return Object.values(daily).slice(0, 5);
};