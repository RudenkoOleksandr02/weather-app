import React from 'react';
import {
  Card,
  Text,
  Image,
  Grid,
  Group,
  Button,
  Box,
  Space,
} from '@mantine/core';
import { DailyWeather } from '../services/fetchWeather';

interface ForecastListProps {
  forecast: DailyWeather[];
  lastUpdated: number;
}

interface ForecastItemProps {
  day: DailyWeather;
  isToday: boolean;
  isNightMode: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({
  day,
  isToday,
  isNightMode,
}) => {
  const dayDate = new Date(day.dt * 1000);
  const tempDay = Math.round(day.temp.day);
  const tempNight = Math.round(day.temp.night);
  const tempMin = Math.round(day.temp.min);
  const tempMax = Math.round(day.temp.max);

  const temperature = isNightMode ? tempNight : tempDay;

  const baseIcon = day.weather[0].icon;
  const iconCode = isNightMode ? baseIcon.replace('d', 'n') : baseIcon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const weekday = dayDate.toLocaleDateString('uk-UA', {
    weekday: 'long',
  });

  return (
    <Grid.Col key={day.dt} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ border: isToday ? '2px solid blue' : undefined }}
        data-testid="data-card"
      >
        <Text style={{ textAlign: 'center' }} fw={700} mb="sm">
          {weekday}
        </Text>

        <Image
          data-testid="weather-icon"
          src={iconUrl}
          alt={day.weather[0].description}
          width={80}
          mx="auto"
        />

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            data-testid="temperature"
            style={{ textAlign: 'center' }}
            size="xl"
            fw={700}
            mt="sm"
          >
            {temperature}°C
          </Text>
          <Text data-testid="weather-description" size="md" c="dimmed">
            {day.weather[0].description}
          </Text>
        </Box>

        <Group
          mt="xs"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text size="sm" c="dimmed">
            min: {tempMin}°C
          </Text>
          <Text size="sm" c="dimmed">
            max: {tempMax}°C
          </Text>
        </Group>
      </Card>
    </Grid.Col>
  );
};

const ForecastList: React.FC<ForecastListProps> = ({
  forecast,
  lastUpdated,
}) => {
  const todayDate = new Date().toDateString();
  const formattedLastUpdated = new Date(lastUpdated).toLocaleString('uk-UA');

  const currentHour = new Date().getHours();
  const isRealNight = currentHour < 6 || currentHour >= 18;

  const [forceNight, setForceNight] = React.useState(false);

  const toggleForceNight = () => setForceNight((prev) => !prev);

  return (
    <div data-testid="data-forecast-list">
      <Group mb="sm">
        <Text size="md" c="dimmed">
          Останнє оновлення: {formattedLastUpdated}
        </Text>
        <Button size="sm" onClick={toggleForceNight}>
          {forceNight
            ? 'Відобразити день для всіх'
            : 'Відобразити ніч для всіх'}
        </Button>
      </Group>

      <Space h="md" />

      <Grid gutter="md">
        {forecast.map((day) => {
          const dayDate = new Date(day.dt * 1000);
          const isToday = dayDate.toDateString() === todayDate;
          const isNightMode = forceNight || (isToday && isRealNight);

          return (
            <ForecastItem
              key={day.dt}
              day={day}
              isToday={isToday}
              isNightMode={isNightMode}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default ForecastList;
