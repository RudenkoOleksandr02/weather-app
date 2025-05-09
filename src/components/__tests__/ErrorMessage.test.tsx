import { screen } from '@testing-library/react';
import { renderWithMantineProvider } from '../../test/helpers/renderWithMantineProvider';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  test('відображає надіслане повідомлення', () => {
    renderWithMantineProvider(<ErrorMessage message="Щось пішло не так" />);
    expect(screen.getByText('Щось пішло не так')).toBeInTheDocument();
  });
  test('відображає заголовок "Помилка"', () => {
    renderWithMantineProvider(<ErrorMessage message="Сталася помилка" />);
    expect(screen.getByText('Помилка')).toBeInTheDocument();
  });

  test('відображає іконку помилки', () => {
    renderWithMantineProvider(<ErrorMessage message="Test" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
