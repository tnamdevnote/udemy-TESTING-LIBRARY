import SummaryForm from '../summary/SummaryForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

test('Initial button state', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: 'Terms and Conditions' });
  const confirmButtonElement = screen.getByRole('button', { name: 'Confirm Order' });

  // initial state
  expect(confirmButtonElement).toBeDisabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox enables button first click and disables on second click', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: 'Terms and Conditions' });
  const confirmButtonElement = screen.getByRole('button', { name: 'Confirm Order' });

  // check the box
  fireEvent.click(checkboxElement);
  expect(confirmButtonElement).toBeEnabled();

  // uncheck the box
  fireEvent.click(checkboxElement);
  expect(confirmButtonElement).toBeDisabled();
});
