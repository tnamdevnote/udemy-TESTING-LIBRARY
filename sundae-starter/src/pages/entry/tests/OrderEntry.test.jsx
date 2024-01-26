import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

// import { render, screen, logRoles } from '@testing-library/react';
import { logRoles, render, screen } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

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

test('disable order button for no scoops', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={vitest.fn()} />);

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  expect(orderButton).toBeDisabled();

  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');
  expect(orderButton).not.toBeDisabled();

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, '0');
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(orderButton).toBeDisabled();
});
