import { render, screen } from '@testing-library/react';
import Options from '../Options';
import { expect } from 'vitest';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  // Grab all the images by it's role and as well as its alt text "~scoops".
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  // Grab all the images for the toppings
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  // expect three items
  expect(toppingImages).toHaveLength(3);
  // confirm alt Text

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
