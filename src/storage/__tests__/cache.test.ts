import { getCache, setCache } from '../cache';
import { CACHE_DURATION, CACHE_KEY } from '../../constants/cache';
import { DailyWeather } from '../../services/fetchWeather';

describe('cacheService', () => {
  const city = 'Kyiv';
  const data: DailyWeather[] = [];

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('setCache має зберігати дані в localStorage', () => {
    setCache(city, data);

    const stored = localStorage.getItem(`${CACHE_KEY}_${city}`);
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored as string);
    expect(parsed.data).toEqual(data);
    expect(typeof parsed.timestamp).toBe('number');
  });

  test('getCache повертає дані, якщо кеш не протерміновано', () => {
    setCache(city, data);

    const cacheEntry = getCache(city);
    expect(cacheEntry).not.toBeNull();
    if (cacheEntry) {
      expect(cacheEntry.data).toEqual(data);
    }
  });

  test('getCache повертає null, якщо кеш протерміновано', () => {
    setCache(city, data);

    const now = Date.now();
    jest.spyOn(Date, 'now').mockReturnValue(now + CACHE_DURATION + 1);

    const cacheEntry = getCache(city);
    expect(cacheEntry).toBeNull();
  });

  test('getCache повертає null, якщо запис відсутній', () => {
    const cacheEntry = getCache(city);
    expect(cacheEntry).toBeNull();
  });
});
