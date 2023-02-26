import { screen } from '@testing-library/react'

import type { ICartItem } from '../../../types'
import { renderWithProviders } from '../../../utils/test-utils'
import CartPopoverItem from '../CartPopoverItem'

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
  renderWithProviders(<CartPopoverItem item={item} />)

  return { item }
}

test('renders item correctly based on props', async () => {
  const { item } = renderComponent()
  const xsButton = screen.getByRole('button', { name: /xs/i })
  const mButton = screen.getByRole('button', { name: /m/i })

  expect(mButton).toHaveStyle({ 'font-weight': '700' })
  expect(xsButton).toHaveStyle({ 'font-weight': '400' })
  expect(screen.getByText(new RegExp(item.title))).toBeInTheDocument()
  expect(
    screen.getByText(new RegExp(String(item.quantity)))
  ).toBeInTheDocument()
  expect(screen.getByText('$234.00')).toBeInTheDocument()

  const img = screen.getByRole('img')
  expect(img).toHaveProperty('src', item.image)
})
