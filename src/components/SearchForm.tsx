import React, { useState, FormEvent } from 'react';
import { TextInput, Button, Group } from '@mantine/core';

interface SearchFormProps {
    onSearch: (city: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} data-testid="data-search-form">
            <Group display="flex" justify="space-between">
                <TextInput
                    data-testid="search-input"
                    placeholder="Введіть населений пункт"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    flex='1'
                    size='md'
                />
                <Button
                    data-testid="search-button"
                    type="submit"
                    size='md'
                >
                    Пошук
                </Button>
            </Group>
        </form>
    );
};

export default SearchForm;
