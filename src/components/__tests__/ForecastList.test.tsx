import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithMantineProvider } from '../../test/helpers/renderWithMantineProvider';
import ForecastList from '../ForecastList';

describe('ForecastList', () => {
  const MOCK_NOW = new Date('2025-04-07T11:00:00').getTime();
  const forecast = [
    {
      dt: new Date('2025-04-07T12:00:00').getTime() / 1000,
      temp: {
        day: 25,
        min: 20,
        max: 27,
        night: 18,
        eve: 23,
        morn: 21,
      },
      weather: [
        {
          description: 'ясно',
          icon: '01d',
        },
      ],
    },
    {
      dt: new Date('2025-04-08T12:00:00').getTime() / 1000,
      temp: {
        day: 22,
        min: 18,
        max: 24,
        night: 17,
        eve: 21,
        morn: 19,
      },
      weather: [
        {
          description: 'облачно',
          icon: '02d',
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(MOCK_NOW);
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test('Останнє оновлення: ...', () => {
    const lastUpdated = new Date('2025-04-07T10:30:00').getTime();
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={lastUpdated} />,
    );
    expect(
      screen.getByText(
        `Останнє оновлення: ${new Date(lastUpdated).toLocaleString('uk-UA')}`,
      ),
    ).toBeInTheDocument();
  });

  test('Тест на кількість карток', () => {
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={MOCK_NOW} />,
    );
    expect(screen.getAllByTestId('data-card')).toHaveLength(2);
  });

  test('Відображає правильний день тижня для кожної картки', () => {
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={MOCK_NOW} />,
    );
    forecast.forEach((day) => {
      const date = new Date(day.dt * 1000);
      const weekday = date.toLocaleDateString('uk-UA', { weekday: 'long' });
      expect(screen.getByText(weekday)).toBeInTheDocument();
    });
  });

  test('Відображає іконку та опис погоди', () => {
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={MOCK_NOW} />,
    );

    forecast.forEach((day, index) => {
      const icons = screen.getAllByTestId('weather-icon');
      const icon = icons[index];

      const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`;
      expect(icon).toHaveAttribute('src', iconUrl);
      expect(icon).toHaveAttribute('alt', day.weather[0].description);
    });
  });

  test('Відображає температуру та опис погоди', () => {
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={MOCK_NOW} />,
    );
    forecast.forEach((day) => {
      const roundedTemp = `${Math.round(day.temp.day)}°C`;
      expect(screen.getByText(roundedTemp)).toBeInTheDocument();
      expect(screen.getByText(day.weather[0].description)).toBeInTheDocument();
    });
  });

  test('Додає обведення для сьогоднішньої картки', () => {
    renderWithMantineProvider(
      <ForecastList forecast={forecast} lastUpdated={MOCK_NOW} />,
    );

    const currentDay = new Date(MOCK_NOW).toLocaleDateString('uk-UA', {
      weekday: 'long',
    });
    const todayCard = screen.getByText(currentDay);
    const card = todayCard.closest('[data-testid="data-card"]');
    expect(card).toHaveStyle('border: 2px solid blue');
  });
});
