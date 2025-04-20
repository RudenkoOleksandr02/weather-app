import { screen } from '@testing-library/react';
import App from './App';
import { useWeather } from './hooks/useWeather';
import { renderWithMantineProvider } from './test/helpers/renderWithMantineProvider';
import { DailyWeather } from './services/fetchWeather';

jest.mock('./hooks/useWeather');
const mockUseWeather = useWeather as jest.Mock;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Рендерит SearchForm та заголовок', () => {
    mockUseWeather.mockReturnValue({
      weather: null,
      error: '',
      loading: false,
      lastUpdated: 0,
    });

    renderWithMantineProvider(<App />);

    expect(screen.getByTestId('data-search-form')).toBeInTheDocument();
    expect(screen.getByText(/Прогноз погоди: Київ/i)).toBeInTheDocument();
  });

  test('Рендерит Loader', () => {
    mockUseWeather.mockReturnValue({
      weather: null,
      error: '',
      loading: true,
      lastUpdated: 0,
    });

    renderWithMantineProvider(<App />);
    expect(screen.getByTestId('data-loader')).toBeInTheDocument();
  });

  test('Рендерит ErrorMessage', () => {
    mockUseWeather.mockReturnValue({
      weather: null,
      error: 'Щось пішло не так',
      loading: false,
      lastUpdated: 0,
    });

    renderWithMantineProvider(<App />);
    expect(screen.getByText(/Щось пішло не так/i)).toBeInTheDocument();
  });

  test('Рендерит ForecastList', () => {
    const fakeWeather: DailyWeather[] = [
      {
        dt: 1,
        temp: { day: 1, min: 1, max: 1, night: 1, eve: 1, morn: 1 },
        weather: [{ description: '1', icon: '1' }],
      },
    ];

    mockUseWeather.mockReturnValue({
      weather: fakeWeather,
      error: '',
      loading: false,
      lastUpdated: 1234567890,
    });

    renderWithMantineProvider(<App />);
    expect(screen.getByTestId('data-forecast-list')).toBeInTheDocument();
  });
});
