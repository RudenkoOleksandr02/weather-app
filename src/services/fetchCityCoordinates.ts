import axios from 'axios';
import {WEATHER_API_KEY, WEATHER_BASE_URL} from "../constants/environment";

export interface CityCoordinates {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export const fetchCityCoordinates = async (city: string): Promise<CityCoordinates | null> => {
    try {
        const response = await axios.get(`${WEATHER_BASE_URL}/geo/1.0/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: WEATHER_API_KEY,
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
