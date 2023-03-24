import { screen, waitFor, within } from '@testing-library/react'
import user from '@testing-library/user-event'

import App from './App'
import { renderWithProviders } from './utils/test-utils'

jest.mock('react-router-dom', () => ({
  // Import non-mocked library and use other functionalities and hooks
  ...(jest.requireActual('react-router-dom') as any),

  // Mock the required hook
  useParams: () => ({ productId: 2 }),
}))

test('can switch product category tabs', async () => {
  renderWithProviders(<App />)

  await screen.findAllByTestId('product-card') //handles act warning
  expect(
    screen.getByRole('heading', { name: /women's clothing/i })
  ).toBeInTheDocument()

  const menButton = screen.getByRole('button', { name: 'men' })

  user.click(menButton)
  await screen.findAllByTestId('product-card')

  const tabHeading = await screen.findByRole('heading', {
    name: /men's clothing/i,
  })

  expect(tabHeading).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: /women's clothing/i })
  ).toBeNull()
})

test('can add product to cart', async () => {
  renderWithProviders(<App />)
  const cards = await screen.findAllByTestId('product-card')
  user.hover(cards[0])
  const addToCartBtn = within(cards[0]).getByLabelText('cart icon')
  user.click(addToCartBtn)

  const cart = await screen.findByTestId('item-count')

  expect(cart).toHaveTextContent('1')
  user.click(addToCartBtn)
  expect(cart).toHaveTextContent('2')
})

test('click on card navigates to product route', async () => {
  renderWithProviders(<App />)

  const cards = await screen.findAllByTestId('product-card')

  expect(cards).toHaveLength(2)
  user.click(cards[0])
  await waitFor(async () => {
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartBtn).toBeInTheDocument()
  })
})

test('can add to cart from product route', async () => {
  renderWithProviders(<App />)

  const cards = await screen.findAllByTestId('product-card')

  user.click(cards[0])
  await waitFor(async () => {
    screen.getByRole('button', { name: /add to cart/i })
  })

  const button = screen.getByRole('button', { name: /add to cart/i })
  user.click(button)
  const itemCount = screen.getByTestId('item-count')
  expect(itemCount).toHaveTextContent('1')
  user.click(button)
  expect(itemCount).toHaveTextContent('2')
})

test('cart popover action buttons disabled when cart is empty', async () => {
  renderWithProviders(<App />)

  await screen.findAllByTestId('product-card')
  user.click(screen.getByLabelText('cart icon'))

  const viewBagBtn = await screen.findByRole('button', { name: /view bag/i })
  const orderBtn = await screen.findByRole('button', { name: /order/i })

  expect(viewBagBtn).toBeDisabled()
  expect(orderBtn).toBeDisabled()
})

test('can navigate to cart route', async () => {
  renderWithProviders(<App />)
  const cards = await screen.findAllByTestId('product-card')
  user.hover(cards[0])
  const addToCartBtn = within(cards[0]).getByLabelText('cart icon')
  user.click(addToCartBtn)

  const cart = await screen.findByTestId('item-count')
  user.click(cart)
  const viewBagBtn = await screen.findByRole('button', { name: /view bag/i })
  user.click(viewBagBtn)
  const cartPageHeading = await screen.findByRole('heading', { name: /cart/i })
  expect(cartPageHeading).toBeInTheDocument()
})

test('can place order via popover', async () => {
  renderWithProviders(<App />)
  const cards = await screen.findAllByTestId('product-card')
  user.hover(cards[0])
  const addToCartBtn = within(cards[0]).getByLabelText('cart icon')
  user.click(addToCartBtn)

  const cart = await screen.findByTestId('item-count')
  user.click(cart)
  const orderBtn = await screen.findByRole('button', { name: /place order/i })
  user.click(orderBtn)
  const successToast = await screen.findByRole('status')
  const successMsg = within(successToast).getByText(/success/i)
  expect(successMsg).toBeInTheDocument()
})

test('can place order via cart page', async () => {
  renderWithProviders(<App />)
  const cards = await screen.findAllByTestId('product-card')
  user.hover(cards[0])
  const addToCartBtn = within(cards[0]).getByLabelText('cart icon')
  user.click(addToCartBtn)

  const cart = await screen.findByTestId('item-count')
  user.click(cart)
  const viewBagBtn = await screen.findByRole('button', { name: /view bag/i })
  user.click(viewBagBtn)

  const orderBtn = await screen.findByRole('button', { name: /place order/i })
  user.click(orderBtn)
  const successToast = await screen.findByRole('status')
  const successMsg = within(successToast).getByText(/success/i)
  expect(successMsg).toBeInTheDocument()
})
