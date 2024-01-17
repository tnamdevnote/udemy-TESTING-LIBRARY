import SummaryForm from '../summary/SummaryForm';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Initial button state', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const confirmButtonElement = screen.getByRole('button', { name: 'Confirm order' });

  // initial state
  expect(confirmButtonElement).toBeDisabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox enables button first click and disables on second click', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const confirmButtonElement = screen.getByRole('button', { name: 'Confirm order' });

  // check the box
  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeEnabled();

  // uncheck the box
  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeDisabled();
});

test('Popover response to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  // using getByText because we are expecting the popover to be there.
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when mouseout
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
