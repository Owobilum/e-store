import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../../utils/test-utils'
import Products from '../Products'

test('renders product cards', async () => {
  renderWithProviders(<Products />)

  const cards = await screen.findAllByTestId('product-card')
  expect(cards).toHaveLength(2)
})
