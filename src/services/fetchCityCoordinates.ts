import axios, { AxiosRequestConfig } from 'axios';
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../constants/environment';

export interface CityCoordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const fetchCityCoordinates = async (
  city: string,
  config?: AxiosRequestConfig,
): Promise<CityCoordinates | null> => {
  try {
    const baseUrl = WEATHER_BASE_URL!;
    const apiKey = WEATHER_API_KEY!;

    const response = await axios.get<CityCoordinates[]>(
      `${baseUrl}/geo/1.0/direct`,
      {
        signal: config?.signal,
        params: { q: city, limit: 1, appid: apiKey },
      },
    );

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }

    console.warn(`Город "${city}" не найден`);
    return null;
  } catch (err) {
    console.error('Ошибка при получении координат:', err);
    return null;
  }
};
