import React from 'react';
import { fetchWeather, DailyWeather } from '../services/fetchWeather';
import { getCache, setCache } from '../storage/cache';

export const useWeather = (city: string) => {
  const [weather, setWeather] = React.useState<DailyWeather[] | null>(null);
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = React.useState<number>(0);

  React.useEffect(() => {
    if (!city) return;

    const loadWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const cached = getCache(city);
        if (cached) {
          setWeather(cached.data);
          setLastUpdated(cached.timestamp);
        } else {
          const data = await fetchWeather(city);
          setWeather(data);
          const now = Date.now();
          setCache(city, data);
          setLastUpdated(now);
        }
      } catch (err) {
        setError('Неможливо отримати дані про погоду');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  return { weather, error, loading, lastUpdated };
};
