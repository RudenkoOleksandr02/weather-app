import { render } from '@testing-library/react';
import React from 'react';
import theme from '../../styles/theme';
import { MantineProvider } from '@mantine/core';

export const renderWithMantineProvider = (component: React.ReactNode) => {
  return render(
    <MantineProvider theme={theme} defaultColorScheme="light">
      {component}
    </MantineProvider>,
  );
};
