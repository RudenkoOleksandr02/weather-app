import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {renderWithMantineProvider} from "../../test/helpers/renderWithMantineProvider";
import SearchForm from "../SearchForm";

describe('SearchForm', () => {
    test('Рендерит поле введення та кнопку', () => {
        renderWithMantineProvider(<SearchForm onSearch={jest.fn()} />);
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    test('Оновлює значення поля під час введення', () => {
        renderWithMantineProvider(<SearchForm onSearch={jest.fn()} />);
        const input = screen.getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'Київ' } });
        expect((input as HTMLInputElement).value).toBe('Київ');
    });

    test('Викликає onSearch при надсиланні форми з непустим значенням', () => {
        const handleSearch = jest.fn();
        renderWithMantineProvider(<SearchForm onSearch={handleSearch} />);
        const input = screen.getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'Львів' } });
        fireEvent.submit(screen.getByTestId('search-button'));
        expect(handleSearch).toHaveBeenCalledWith('Львів');
    });

    test('Не викликає onSearch при порожньому значенні', () => {
        const handleSearch = jest.fn();
        renderWithMantineProvider(<SearchForm onSearch={handleSearch} />);
        fireEvent.submit(screen.getByTestId('search-button'));
        expect(handleSearch).not.toHaveBeenCalled();
    });
});