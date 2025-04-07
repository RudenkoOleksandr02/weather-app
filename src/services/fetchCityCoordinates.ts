import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;

export interface CityCoordinates {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export const fetchCityCoordinates = async (city: string): Promise<CityCoordinates | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: API_KEY,
            },
        });

        if (response.data && response.data.length > 0) {
            return response.data[0];
        } else {
            console.warn('Місто не знайдено');
            return null;
        }
    } catch (error) {
        console.error('Помилка при отриманні координат міста:', error);
        return null;
    }
};
