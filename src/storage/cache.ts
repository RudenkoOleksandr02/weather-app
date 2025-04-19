import { CACHE_DURATION, CACHE_KEY } from '../constants/cache';
import { DailyWeather } from '../services/fetchWeather';

interface CacheEntry {
  data: DailyWeather[];
  timestamp: number;
}

export const setCache = (city: string, data: DailyWeather[]) => {
  const cacheEntry: CacheEntry = { data, timestamp: Date.now() };
  localStorage.setItem(`${CACHE_KEY}_${city}`, JSON.stringify(cacheEntry));
};

export const getCache = (city: string): CacheEntry | null => {
  const cached = localStorage.getItem(`${CACHE_KEY}_${city}`);
  if (cached) {
    const cacheEntry = JSON.parse(cached);
    if (Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
      return cacheEntry;
    }
  }
  return null;
};
