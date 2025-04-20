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
  const baseUrl = WEATHER_BASE_URL!;
  const apiKey = WEATHER_API_KEY!;

  const url = `${baseUrl}/geo/1.0/direct`;
  const params = { q: city, limit: 1, appid: apiKey };
  const options: AxiosRequestConfig = { params };
  if (config?.signal) {
    options.signal = config.signal;
  }

  try {
    const response = await axios.get<CityCoordinates[]>(url, options);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    console.warn(`Місто "${city}" не знайдено`);
    return null;
  } catch (err) {
    console.error('Помилка при отриманні координат:', err);
    return null;
  }
};
