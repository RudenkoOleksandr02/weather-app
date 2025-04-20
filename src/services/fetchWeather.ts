import axios, { AxiosRequestConfig } from 'axios';
import { fetchCityCoordinates, CityCoordinates } from './fetchCityCoordinates';
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../constants/environment';

export interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface OneCallResponse {
  daily: DailyWeather[];
}

export const fetchWeather = async (
  city: string,
  config?: AxiosRequestConfig,
): Promise<DailyWeather[]> => {
  const baseUrl = WEATHER_BASE_URL!;
  const apiKey = WEATHER_API_KEY!;

  const coords: CityCoordinates | null = config
    ? await fetchCityCoordinates(city, config)
    : await fetchCityCoordinates(city);

  if (!coords) {
    throw new Error(`Місто ${city} не знайдено`);
  }

  const url = `${baseUrl}/data/3.0/onecall`;
  const params = {
    lat: coords.lat,
    lon: coords.lon,
    exclude: 'current,minutely,hourly,alerts',
    appid: apiKey,
    units: 'metric',
    lang: 'ua',
  };
  const options: AxiosRequestConfig = { params };
  if (config?.signal) {
    options.signal = config.signal;
  }

  try {
    const response = await axios.get<OneCallResponse>(url, options);
    if (!response.data || !Array.isArray(response.data.daily)) {
      throw new Error('Неправильний формат відповіді API');
    }
    return response.data.daily;
  } catch (err) {
    console.error('Помилка при отриманні прогнозу погоди:', err);
    throw err;
  }
};
