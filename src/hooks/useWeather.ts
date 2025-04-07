import { useState, useEffect } from 'react';
import { fetchWeather, DailyWeather } from '../services/fetchWeather';
import { getCache, setCache } from '../services/cacheService';

export const useWeather = (city: string) => {
    const [weather, setWeather] = useState<DailyWeather[] | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<number>(0);

    useEffect(() => {
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
