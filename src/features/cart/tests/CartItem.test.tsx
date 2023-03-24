import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import CartItem from '../CartItem'
import type { ICartItem } from '../../../types'
import userEvent from '@testing-library/user-event'

function renderComponent() {
  const item: ICartItem = {
    category: "women's clothing",
    description: 'beautiful patterns',
    id: 1,
    image: 'http://img.com/',
    price: '234',
    quantity: 56,
    size: 'm',
    title: 'green dress',
  }
  renderWithProviders(<CartItem item={item} />)

  return { item }
}

test('renders correctly based on data', () => {
  const { item } = renderComponent()

  expect(screen.getByText(item.title)).toBeInTheDocument()
  expect(screen.getByText(item.category)).toBeInTheDocument()
  expect(screen.getByText(`$${234}.00`)).toBeInTheDocument()
  expect(screen.getByText(String(item.quantity))).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveProperty('src', item.image)
  expect(screen.getAllByRole('button')).toHaveLength(6)
})

// test('changes image view angle', () => {
//   renderComponent()

//   const img = screen.getByRole('img')
//   const forwardBtn = screen.getByRole('button', { name: 'forward' })
//   const backBtn = screen.getByRole('button', { name: 'backward' })

//   expect(img).toHaveStyle({ 'object-position': 'top right' })

//   userEvent.click(forwardBtn)

//   expect(img).not.toHaveStyle({ 'object-position': 'top right' })

//   userEvent.click(backBtn)

//   expect(img).toHaveStyle({ 'object-position': 'top right' })
// })
