import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import Product from '../Product'

jest.mock('react-router-dom', () => ({
  // Import non-mocked library and use other functionalities and hooks
  ...(jest.requireActual('react-router-dom') as any),

  // Mock the required hook
  useParams: () => ({ productId: 2 }),
}))

test('displays correct product info', async () => {
  renderWithProviders(<Product />)

  const productName = await screen.findByText(/2 Blazer/i)
  const description = screen.getByText(/2 Stylist plain blue blazer/i)
  const price = screen.getByText('$200.00')
  const category = screen.getByText(/women's clothing/i)
  const productImg = screen.getByRole('img', { name: /product image/i })

  expect(description).toBeInTheDocument()
  expect(productName).toBeInTheDocument()
  expect(price).toBeInTheDocument()
  expect(category).toBeInTheDocument()
  expect(productImg).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /add to cart/i })
  ).toBeInTheDocument()

  expect(await screen.findAllByRole('img')).toHaveLength(1)
})

// test('switches product image view angle', async () => {
//   renderWithProviders(<Product />)
//   const productImg = await screen.findByRole('img', { name: /product image/i })
//   const bottomViewBtn = screen.getByRole('img', {
//     name: /product bottom right view/i,
//   })

//   expect(productImg).toHaveStyle({ 'object-position': 'top left' })
//   user.click(bottomViewBtn)
//   expect(productImg).toHaveStyle({ 'object-position': 'bottom right' })
// })

test('switches item size', async () => {
  renderWithProviders(<Product />)
  const xsButton = await screen.findByRole('button', { name: /xs/i })

  expect(xsButton).toHaveStyle({ 'font-weight': '400' })
  user.click(xsButton)
  expect(xsButton).toHaveStyle({ 'font-weight': '700' })
})
