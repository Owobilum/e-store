import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../../utils/test-utils'
import Cart from '../Cart'

test('renders essential cart values', () => {
  renderWithProviders(<Cart />)

  const heading = screen.getByRole('heading', { name: /cart/i })
  const orderButton = screen.getByRole('button', { name: /order/i })
  const totals = screen.getAllByText(/total/i)
  const tax = screen.getByText(new RegExp(/tax/i))
  const quantity = screen.getByText(/quantity/i)

  expect(heading).toBeInTheDocument()
  expect(orderButton).toBeInTheDocument()
  expect(totals).toHaveLength(2)
  expect(tax).toBeInTheDocument()
  expect(quantity).toBeInTheDocument()
})
