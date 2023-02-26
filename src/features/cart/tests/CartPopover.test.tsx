import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import CartPopover from '../CartPopover'
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
  renderWithProviders(<CartPopover />, {
    preloadedState: {
      cart: { isCartPopoverActive: true, cart: initialCartState },
    },
  })
  return { initialCartState }
}

test('updates selected item size', () => {
  renderComponent()
  const xsButton = screen.getByRole('button', { name: /xs/i })
  const mButton = screen.getByRole('button', { name: /m/i })

  expect(mButton).toHaveStyle({ 'font-weight': '700' })

  user.click(xsButton)

  expect(mButton).not.toHaveStyle({ 'font-weight': '700' })
  expect(xsButton).toHaveStyle({ 'font-weight': '700' })
})

test('updates item quantity', () => {
  const { initialCartState } = renderComponent()
  const addBtn = screen.getByRole('button', { name: '+' })
  const removeBtn = screen.getByRole('button', { name: '-' })

  expect(
    screen.getAllByText(new RegExp(String(initialCartState[0].quantity)))
  ).toHaveLength(2)

  user.click(addBtn)

  expect(
    screen.getAllByText(new RegExp(String(initialCartState[0].quantity + 1)))
  ).toHaveLength(2)
  expect(
    screen.queryByText(new RegExp(String(initialCartState[0].quantity)))
  ).toBeNull()

  user.click(removeBtn)

  expect(
    screen.getAllByText(new RegExp(String(initialCartState[0].quantity)))
  ).toHaveLength(2)
})

test('outputs correct total', () => {
  const { initialCartState } = renderComponent()

  const total = String(
    Number(initialCartState[0].price) * initialCartState[0].quantity
  )
  expect(screen.getByText(`$${total}.00`)).toBeInTheDocument()
})

test('displays view bag button', () => {
  renderComponent()
  expect(screen.getByRole('button', { name: /view bag/i })).toBeInTheDocument()
})

test('displays message when cart empty', () => {
  renderWithProviders(<CartPopover />)
  expect(screen.getByText(/No items in cart/i)).toBeInTheDocument()
})
