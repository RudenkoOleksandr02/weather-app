import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWeather, DailyWeather } from '../services/fetchWeather';
import { getCache, setCache } from '../storage/cache';

export interface UseWeatherResult {
  weather: DailyWeather[] | null;
  loading: boolean;
  error: string;
  lastUpdated: number;
  refresh: () => void;
}

export const useWeather = (city: string): UseWeatherResult => {
  const [weather, setWeather] = useState<DailyWeather[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(0);

  const controllerRef = useRef<AbortController | null>(null);

  const loadWeather = useCallback(
    async (force = false) => {
      if (!city) return;
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError('');

      const cached = getCache(city);
      if (cached && !force) {
        setWeather(cached.data);
        setLastUpdated(cached.timestamp);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchWeather(city, { signal: controller.signal });
        const now = Date.now();
        setWeather(data);
        setLastUpdated(now);
        setCache(city, data);
      } catch (rawErr: unknown) {
        let msg = 'Помилка завантаження погоди';
        if (rawErr instanceof Error) {
          if (rawErr.name === 'AbortError') {
            return;
          }
          msg = rawErr.message;
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [city],
  );

  useEffect(() => {
    if (!city) return;
    void loadWeather(false);
    return () => {
      controllerRef.current?.abort();
    };
  }, [city, loadWeather]);

  const refresh = useCallback(() => {
    void loadWeather(true);
  }, [loadWeather]);

  return { weather, loading, error, lastUpdated, refresh };
};
