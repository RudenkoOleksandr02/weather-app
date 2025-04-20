import axios, { AxiosRequestConfig } from 'axios';
import { fetchCityCoordinates } from './fetchCityCoordinates';
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

export const fetchWeather = async (
  city: string,
  config?: AxiosRequestConfig,
): Promise<DailyWeather[]> => {
  try {
    const coordinates = await fetchCityCoordinates(city);

    if (!coordinates) {
      throw new Error(`Місто ${city} не знайдено`);
    }

    const response = await axios.get(`${WEATHER_BASE_URL}/data/3.0/onecall`, {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        exclude: 'current,minutely,hourly,alerts',
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'ua',
      },
      ...config,
    });

    const dailyData = response.data?.daily;

    if (!dailyData || !Array.isArray(dailyData)) {
      throw new Error('Невірний формат відповіді від API');
    }

    return dailyData;
  } catch (error) {
    console.error('Помилка при отриманні даних про погоду:', error);
    throw error;
  }
};
