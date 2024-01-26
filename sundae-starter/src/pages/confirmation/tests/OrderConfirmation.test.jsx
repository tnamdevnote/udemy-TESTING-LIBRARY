import { render, screen } from '../../../test-utils/testing-library-utils';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';
import OrderConfirmation from '../OrderConfirmation';

test('server error on order confirmation page', async () => {
  server.resetHandlers(
    http.post('http://localhost:3030/order', () => {
      return new HttpResponse.json(null, { status: 500 });
    })
  );

  render(<OrderConfirmation setOrderPhase={vitest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('An unexpected error occurred. Please try again later.');
});
