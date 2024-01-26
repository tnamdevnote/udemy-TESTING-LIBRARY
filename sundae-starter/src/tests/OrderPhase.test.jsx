import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { expect } from 'vitest';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  // destructure 'unmount' from return value to use at the end of the test
  const { unmount } = render(<App />);

  // -------------- Order In Progress --------------
  const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent('0.00');

  // add ice cream scoops and toppings
  const scoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(scoopInput);
  await user.type(scoopInput, '2');
  expect(grandTotal).toHaveTextContent('4.00');

  const toppingsCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  await user.click(toppingsCheckbox);
  expect(grandTotal).toHaveTextContent('5.50');

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  await user.click(orderButton);
  // What should I expect then?

  // -------------- Order Review --------------
  // check summary information based on order
  const scoopsSummary = screen.getByRole('heading', { name: /Scoops: \$/i });
  expect(scoopsSummary).toHaveTextContent('4.00');
  const toppingsSummary = screen.getByRole('heading', { name: /Toppings: \$/i });
  expect(toppingsSummary).toHaveTextContent('1.50');
  // const summaryTotal = screen.getByRole('heading', { name: /Total \$/i });
  // expect(summaryTotal).toHaveTextContent('5.50');

  // accept terms and conditions and click button to confirm order
  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(confirmButton).toBeDisabled();
  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();
  await user.click(confirmButton);

  // -------------- Order Confirmation --------------
  // confirm order number on confirmation page
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number is /i);
  expect(orderNumber).toHaveTextContent('231249834');

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: 'Create new order' });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // unmount the component to trigger cleanup and avoid
  // "not wrapped in act()" error
  // This is a good practice
  unmount();
});

test('Toppings header is not on summary page if no toppings ordered', async () => {
  const user = userEvent.setup();
  render(<App />);

  const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent('0.00');

  const scoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(scoopInput);
  await user.type(scoopInput, '2');
  expect(grandTotal).toHaveTextContent('4.00');

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  await user.click(orderButton);

  const scoopsHeading = screen.getByRole('heading', { name: /Scoops: \$/i });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', { name: /Toppings: \$/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test('Toppings header is not on summary page when toppings were removed', async () => {
  const user = userEvent.setup();
  render(<App />);

  const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent('0.00');

  const scoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(scoopInput);
  await user.type(scoopInput, '2');
  expect(grandTotal).toHaveTextContent('4.00');

  const toppingsCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  await user.click(toppingsCheckbox);
  expect(toppingsCheckbox).toBeChecked();
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // remove the topping
  await user.click(toppingsCheckbox);
  expect(toppingsCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // find and click order summary button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  await user.click(orderButton);

  const scoopsHeading = screen.getByRole('heading', { name: /Scoops: \$/i });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', { name: /Toppings: \$/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
