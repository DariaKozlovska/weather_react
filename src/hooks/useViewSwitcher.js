import { useState, useCallback } from 'react';

export const useViewSwitcher = (initialView = 'current') => {
  const [view, setView] = useState(initialView);

  const showCurrent = useCallback(() => setView('current'), []);
  const showForecast = useCallback(() => setView('forecast'), []);

  return { view, showCurrent, showForecast };
};