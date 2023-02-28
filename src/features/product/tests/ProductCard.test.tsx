import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import type { IProduct } from '../../../types'
import { renderWithProviders } from '../../../utils/test-utils'
import ProductCard from '../ProductCard'

function renderComponent() {
  const product: IProduct = {
    id: 12,
    category: "men's clothing",
    description: 'Stylist plain red blazer',
    image: 'https://product.com/',
    price: '100',
    title: 'Blazer',
  }
  const mock = jest.fn()
  renderWithProviders(<ProductCard product={product} onClick={mock} />)

  return { product, mock }
}

test('displays product info on card', () => {
  const { product } = renderComponent()
  const productImg = screen.getByRole('img')

  expect(productImg).toHaveProperty('src', product.image)
  expect(
    screen.getByRole('heading', { name: new RegExp(product.title) })
  ).toBeInTheDocument()
  expect(screen.getByText(`$${product.price}.00`)).toBeInTheDocument()
})

test('cart icon is displayed when cart is hovered', async () => {
  renderComponent()
  const productImg = screen.getByRole('img')
  expect(screen.queryByLabelText(/cart icon/i)).toBeNull()

  user.hover(productImg)

  const cartIcon = screen.getByLabelText(/cart icon/i)
  expect(cartIcon).toBeInTheDocument()

  user.unhover(productImg)

  expect(screen.queryByLabelText(/cart icon/i)).toBeNull()
})

test('clicking on cart calls function', () => {
  const { mock } = renderComponent()
  const productImg = screen.getByRole('img')
  user.hover(productImg)
  const cartIcon = screen.getByLabelText(/cart icon/i)
  user.click(cartIcon)

  expect(mock).toHaveBeenCalledTimes(1)
})
