import { screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import Cart from '../Cart'
import type { ICartItem } from '../../../types'

function renderComponent() {
  const initialCartState: ICartItem[] = [
    {
      category: "women's clothing",
      description: 'very very classy',
      id: 1,
      image: 'http://img.com/',
      price: '50',
      quantity: 10,
      size: 'm',
      title: 'dress',
    },
  ]
  renderWithProviders(<Cart />, {
    preloadedState: {
      cart: { isCartPopoverActive: true, cart: initialCartState },
    },
  })
  return { initialCartState }
}

test('renders essential cart values', () => {
  renderWithProviders(<Cart />)

  const heading = screen.getByRole('heading', { name: /cart/i })
  const orderButton = screen.getByRole('button', { name: /place order/i })
  const totals = screen.getAllByText(/total/i)
  const tax = screen.getByText(new RegExp(/tax/i))
  const quantity = screen.getByText(/quantity/i)

  expect(heading).toBeInTheDocument()
  expect(orderButton).toBeInTheDocument()
  expect(totals).toHaveLength(2)
  expect(tax).toBeInTheDocument()
  expect(quantity).toBeInTheDocument()
})

test('sets selected item size', () => {
  const { initialCartState } = renderComponent()

  const mButton = screen.getByRole('button', {
    name: new RegExp(initialCartState[0].size),
  })
  const xsButton = screen.getByRole('button', { name: /xs/i })

  expect(mButton).toHaveStyle({ 'font-weight': '700' })
  expect(xsButton).toHaveStyle({ 'font-weight': '400' })

  user.click(xsButton)

  expect(mButton).toHaveStyle({ 'font-weight': '400' })
  expect(xsButton).toHaveStyle({ 'font-weight': '700' })
})

test('updates quantity', () => {
  const { initialCartState } = renderComponent()
  const addBtn = screen.getByRole('button', { name: '+' })
  const removeBtn = screen.getByRole('button', { name: '-' })

  const quantity = within(screen.getByTestId('quantity')).getByText(
    new RegExp(String(initialCartState[0].quantity))
  )
  expect(quantity).toBeInTheDocument()

  user.click(addBtn)

  expect(
    within(screen.getByTestId('quantity')).getByText(
      new RegExp(String(initialCartState[0].quantity + 1))
    )
  ).toBeInTheDocument()

  expect(
    // eslint-disable-next-line testing-library/prefer-presence-queries
    within(screen.getByTestId('quantity')).queryByText(
      new RegExp(String(initialCartState[0].quantity))
    )
  ).toBeNull()

  user.click(removeBtn)

  expect(
    within(screen.getByTestId('quantity')).getByText(
      new RegExp(String(initialCartState[0].quantity))
    )
  ).toBeInTheDocument()
})

test('displays correct amounts', () => {
  renderComponent()

  const tax = screen.getByText('$105.00')
  const subtotal = screen.getByText('$500.00')
  const total = screen.getByText('$605.00')

  expect(tax).toBeInTheDocument()
  expect(subtotal).toBeInTheDocument()
  expect(total).toBeInTheDocument()
})
