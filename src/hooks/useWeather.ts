import { useState, useEffect } from 'react';
import { fetchWeather, DailyWeather } from '../services/fetchWeather';
import { getCache, setCache } from '../storage/cache';

interface UseWeatherResult {
  weather: DailyWeather[] | null;
  loading: boolean;
  error: string;
  lastUpdated: number;
}

export const useWeather = (city: string): UseWeatherResult => {
  const [weather, setWeather] = useState<DailyWeather[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const loadWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const cached = getCache(city);
        if (cached) {
          setWeather(cached.data);
          setLastUpdated(cached.timestamp);
          return;
        }

        const data = await fetchWeather(city, { signal });
        setWeather(data);

        const now = Date.now();
        setCache(city, data);
        setLastUpdated(now);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Ошибка загрузки погоды');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();

    return () => {
      controller.abort();
    };
  }, [city]);

  return { weather, loading, error, lastUpdated };
};
