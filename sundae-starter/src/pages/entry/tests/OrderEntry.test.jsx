import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

// import { render, screen, logRoles } from '@testing-library/react';
import { render, screen } from '../../../test-utils/testing-librar-utils';
import OrderEntry from '../OrderEntry';
import { expect } from 'vitest';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  const { container } = render(<OrderEntry />);

  const alerts = await screen.findAllByText('An unexpected error occurred. Please try again later.');
  expect(alerts).toHaveLength(2);
});
