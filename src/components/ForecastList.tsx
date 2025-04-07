import React from 'react';
import { Card, Text, Image, Grid } from '@mantine/core';
import { DailyWeather } from '../services/fetchWeather';

interface ForecastListProps {
    forecast: DailyWeather[];
    lastUpdated: number;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, lastUpdated }) => {
    const todayDate = new Date().toDateString();
    const formattedLastUpdated = new Date(lastUpdated).toLocaleString('uk-UA');

    return (
        <div data-testid="data-forecast-list">
            <Text size="md" c="dimmed" style={{ textAlign: 'center' }} mb="md">
                Останнє оновлення: {formattedLastUpdated}
            </Text>
            <Grid gutter="md">
                {forecast.map((day) => {
                    const dayDate = new Date(day.dt * 1000);
                    const isToday = dayDate.toDateString() === todayDate;
                    const weekday = dayDate.toLocaleDateString('uk-UA', { weekday: 'long' });
                    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`;

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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text
                                        data-testid="temperature"
                                        style={{ textAlign: 'center' }}
                                        size="xl"
                                        fw={700}
                                        mt="sm"
                                    >
                                        {Math.round(day.temp.day)}°C
                                    </Text>
                                    <Text
                                        data-testid="weather-description"
                                        style={{ textAlign: 'center' }}
                                        size="md"
                                        c="dimmed"
                                    >
                                        {day.weather[0].description}
                                    </Text>
                                </div>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </Grid>
        </div>
    );
};

export default ForecastList;
