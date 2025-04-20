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

  const coords: CityCoordinates | null = await fetchCityCoordinates(
    city,
    config,
  );
  if (!coords) {
    throw new Error(`Город "${city}" не найден`);
  }

  try {
    const response = await axios.get<OneCallResponse>(
      `${baseUrl}/data/3.0/onecall`,
      {
        signal: config?.signal,
        params: {
          lat: coords.lat,
          lon: coords.lon,
          exclude: 'current,minutely,hourly,alerts',
          appid: apiKey,
          units: 'metric',
          lang: 'ua',
        },
      },
    );

    if (!response.data || !Array.isArray(response.data.daily)) {
      throw new Error('Неверный формат ответа API');
    }

    return response.data.daily;
  } catch (err) {
    console.error('Ошибка при получении прогноза погоды:', err);
    throw err;
  }
};
