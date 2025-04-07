import {getCache, setCache} from "./cacheService";

const CACHE_KEY = 'weatherData';
const CACHE_DURATION = 5 * 60 * 1000;

describe('cacheService', () => {
    const city = 'Kyiv';
    const data = { temperature: 20 };

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
        // Перевіряємо, що timestamp є числом і приблизно співпадає з поточним часом
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