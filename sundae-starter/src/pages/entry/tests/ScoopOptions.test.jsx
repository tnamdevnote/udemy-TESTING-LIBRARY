import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOptions from '../ScoopOptions';

test('test input validate', async () => {
  const user = userEvent.setup();
  render(<ScoopOptions name={vitest.fn()} imagePath={vitest.fn()} />);

  // No need to wait for scoop option because this
  // component itself does not communicate with the server.
  // It gets the information from Option component via props,
  // which we do not need for testing this component.
  const scoopInput = screen.getByRole('spinbutton');
  await user.clear(scoopInput);
  await user.type(scoopInput, '-1');
  expect(scoopInput).toHaveClass('is-invalid');

  await user.clear(scoopInput);
  await user.type(scoopInput, '0.5');
  expect(scoopInput).toHaveClass('is-invalid');

  await user.clear(scoopInput);
  await user.type(scoopInput, '11');
  expect(scoopInput).toHaveClass('is-invalid');

  await user.clear(scoopInput);
  await user.type(scoopInput, '3');
  expect(scoopInput).not.toHaveClass('is-invalid');
});
