import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../slices/weatherSlice';

export const useWeather = (city) => {
  const dispatch = useDispatch();
  const { current, forecast, loading, error } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    if (city) dispatch(fetchWeather(city));
  }, [dispatch, city]);

  return { current, forecast, loading, error };
};