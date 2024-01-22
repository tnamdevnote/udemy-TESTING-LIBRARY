import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  // clear up the input before any testing.
  await user.clear(vanillaInput);
  // user types into the input 1
  await user.type(vanillaInput, '1');
  // then we expect the subtotals to have $2.00
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update the chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update subtotal when toppings change', async () => {
  // set up user and render Toppings components
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure subtotals starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // Cherries
  const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
  await user.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // M&Ms
  // There's no need to await since we know that the data is already loaded
  const mnmInput = screen.getByRole('checkbox', { name: 'M&Ms' });
  await user.click(mnmInput);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // Hot Fudge
  const hotFudgeInput = screen.getByRole('checkbox', { name: 'Hot fudge' });
  await user.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent('4.50');

  await user.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});
