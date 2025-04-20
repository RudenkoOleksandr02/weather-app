import axios from 'axios';
import { CityCoordinates, fetchCityCoordinates } from '../fetchCityCoordinates';
import { fetchWeather } from '../fetchWeather';
import { WEATHER_API_KEY } from '../../constants/environment';

jest.mock('axios');
jest.mock('../fetchCityCoordinates');

describe('fetchWeather', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedFetchCityCoordinates =
    fetchCityCoordinates as jest.MockedFunction<typeof fetchCityCoordinates>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Має повернути масив даних про погоду при успішному запиті', async () => {
    const city = 'Київ';
    const coordinates = { lat: 50.4501, lon: 30.5234 } as CityCoordinates;
    mockedFetchCityCoordinates.mockResolvedValue(coordinates);

    const fakeDailyWeather = [
      {
        dt: 1618317040,
        temp: { day: 15, min: 10, max: 18, night: 11, eve: 14, morn: 10 },
        weather: [{ description: 'ясно', icon: '01d' }],
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: { daily: fakeDailyWeather } });

    const result = await fetchWeather(city);

    expect(result).toEqual(fakeDailyWeather);
    expect(mockedFetchCityCoordinates).toHaveBeenCalledWith(city);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/data/3.0/onecall'),
      {
        params: expect.objectContaining({
          lat: coordinates.lat,
          lon: coordinates.lon,
          exclude: 'current,minutely,hourly,alerts',
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'ua',
        }),
      },
    );
  });

  test('Має викинути помилку, якщо координати міста не знайдені', async () => {
    const city = 'Щось';
    mockedFetchCityCoordinates.mockResolvedValue(null);

    await expect(fetchWeather(city)).rejects.toThrow(
      `Місто ${city} не знайдено`,
    );
    expect(mockedFetchCityCoordinates).toHaveBeenCalledWith(city);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  test('Повинна прокинути помилку при збої запиту до API', async () => {
    const city = 'Київ';
    const coordinates = { lat: 50.4501, lon: 30.5234 } as CityCoordinates;
    mockedFetchCityCoordinates.mockResolvedValue(coordinates);

    const apiError = new Error('Помилка API');
    mockedAxios.get.mockRejectedValue(apiError);

    await expect(fetchWeather(city)).rejects.toThrow('Помилка API');
    expect(mockedFetchCityCoordinates).toHaveBeenCalledWith(city);
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
