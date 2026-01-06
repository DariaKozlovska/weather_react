import {useSelector} from 'react-redux';

export const useTemperatureUnit = () => {
    return useSelector(state => state.unit.unit);
};
