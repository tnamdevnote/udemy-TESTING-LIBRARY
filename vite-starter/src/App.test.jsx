import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button starts with correct label and color', () => {
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
