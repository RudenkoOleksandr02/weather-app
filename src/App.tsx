import React from 'react';
import { Container, Loader, Space } from '@mantine/core';
import SearchForm from './components/SearchForm';
import ErrorMessage from './components/ErrorMessage';
import ForecastList from './components/ForecastList';
import { useWeather } from './hooks/useWeather';

const App: React.FC = () => {
  const [city, setCity] = React.useState('Київ');
  const { weather, error, loading, lastUpdated } = useWeather(city);

  return (
    <Container size="lg" py="xl">
      <SearchForm onSearch={setCity} />
      <h2>Прогноз погоди: {city}</h2>
      {loading && <Loader data-testid="data-loader" variant="bars" />}
      {error && <ErrorMessage message={error} />}
      <Space h="md" />
      {weather && <ForecastList forecast={weather} lastUpdated={lastUpdated} />}
    </Container>
  );
};

export default App;
