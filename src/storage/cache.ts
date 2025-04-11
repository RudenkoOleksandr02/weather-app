import {CACHE_DURATION, CACHE_KEY} from "../constants/cache";


interface CacheEntry {
    data: any;
    timestamp: number;
}

export const setCache = (city: string, data: any) => {
    const cacheEntry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(`${CACHE_KEY}_${city}`, JSON.stringify(cacheEntry));
};

export const getCache = (city: string): any | null => {
    const cached = localStorage.getItem(`${CACHE_KEY}_${city}`);
    if (cached) {
        const cacheEntry: CacheEntry = JSON.parse(cached);
        if (Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
            return cacheEntry;
        }
    }
    return null;
};
