import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { expect } from 'vitest';

test('button click flow', () => {
  // render component
  render(<App />);
  // checks if the button exists and if its text contains 'blue' text.
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  // checks if the button has class name of 'red'
  expect(buttonElement).toHaveClass('red');

  // click the button
  fireEvent.click(buttonElement);

  // check the button text
  expect(buttonElement).toHaveTextContent(/red/i);

  expect(buttonElement).toHaveClass('blue');
});

test('checkbox flow', () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial condition
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // toggle the checkbox - check
  fireEvent.click(checkboxElement);

  // check disabled state
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveStyle({ 'background-color': 'rgb(128, 128, 128)' });

  // toggle the checkbox - uncheck
  fireEvent.click(checkboxElement);

  // check enabled state
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
});

test('checkbox flow after button click', () => {
  render(<App />);
  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  fireEvent.click(buttonElement);

  // toggle the checkbox - check
  fireEvent.click(checkboxElement);

  // check disabled state
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveStyle({ 'background-color': 'rgb(128, 128, 128)' });

  // toggle the checkbox - uncheck
  fireEvent.click(checkboxElement);

  // check enabled state
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
});
