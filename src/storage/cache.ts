import { CACHE_DURATION, CACHE_KEY } from '../constants/cache';
import { DailyWeather } from '../services/fetchWeather';

interface CacheEntry {
  data: DailyWeather[];
  timestamp: number;
}

export const getCacheKey = (city: string): string =>
  `${CACHE_KEY}_${city.trim().toLowerCase().replace(/\s+/g, '_')}`;

export const setCache = (city: string, data: DailyWeather[]): void => {
  const cacheEntry: CacheEntry = { data, timestamp: Date.now() };
  const key = getCacheKey(city);
  try {
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (err) {
    console.warn('Неможливо записати в localStorage', err);
  }
};

export const getCache = (city: string): CacheEntry | null => {
  const key = getCacheKey(city);
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheEntry = JSON.parse(cached) as CacheEntry;
    if (Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
      return cacheEntry;
    } else {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn('Помилка при читанні або парсингу localStorage', err);
  }
  return null;
};
