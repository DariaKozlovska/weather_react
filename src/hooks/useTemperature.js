import {useSelector} from 'react-redux';

export const useTemperatureUnit = () => {
    return useSelector(state => state.settings.unit);
};

export const convertTemperature = (tempC, unit) => {
    if (unit === 'F') return (tempC * 9) / 5 + 32;
    if (unit === 'K') return tempC + 273.15;
    return tempC;
};
