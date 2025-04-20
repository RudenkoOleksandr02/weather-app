import React from 'react';
import { Button, Container, Loader, Space } from '@mantine/core';
import SearchForm from './components/SearchForm';
import ErrorMessage from './components/ErrorMessage';
import ForecastList from './components/ForecastList';
import { useWeather } from './hooks/useWeather';

const App: React.FC = () => {
  const [city, setCity] = React.useState('Київ');
  const { weather, loading, error, lastUpdated, refresh } = useWeather(city);

  return (
    <Container size="lg" py="xl">
      <SearchForm onSearch={setCity} />
      <h2>Прогноз погоди: {city}</h2>
      {loading && <Loader data-testid="data-loader" variant="bars" />}
      {error && <ErrorMessage message={error} />}
      <Space h="md" />
      <Button onClick={refresh} disabled={loading}>
        Оновити
      </Button>
      <Space h="md" />
      {weather && <ForecastList forecast={weather} lastUpdated={lastUpdated} />}
    </Container>
  );
};

export default App;
