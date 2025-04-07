import axios from 'axios';
import { fetchCityCoordinates, CityCoordinates } from './fetchCityCoordinates';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchCityCoordinates', () => {
    const cityName = 'Kyiv';
    const fakeData: CityCoordinates[] = [
        {
            name: 'Kyiv',
            lat: 50.4501,
            lon: 30.5234,
            country: 'UA',
            state: 'Kyiv',
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('повертає координати міста, якщо дані знайдено', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: fakeData });
        const result = await fetchCityCoordinates(cityName);

        expect(result).toEqual(fakeData[0]);
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/geo/1.0/direct'), {
            params: {
                q: cityName,
                limit: 1,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
        });
    });

    it('Повертає null, якщо дані не знайдено', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });
        const result = await fetchCityCoordinates(cityName);
        expect(result).toBeNull();
    });

    it('Повертає null при помилці запиту', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        const result = await fetchCityCoordinates(cityName);
        expect(result).toBeNull();
    });
});