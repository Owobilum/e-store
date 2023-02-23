import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import type { CurrencyType } from '../../../types'
import { renderWithProviders } from '../../../utils/test-utils'
import CurrencySwitcher from './CurrencySwitcher'

function renderComponent() {
  const currencies: { name: CurrencyType; symbol: string }[] = [
    { name: 'usd', symbol: '$' },
    { name: 'eur', symbol: 'e' },
  ]
  renderWithProviders(<CurrencySwitcher currencies={currencies} />)
}

test('it displays currency options', () => {
  renderComponent()
  const button = screen.getByRole('button', {
    name: /toggle currency dropdown/i,
  })
  const euroOption = screen.getByText(new RegExp('eur'))
  const usdOption = screen.getByText(new RegExp('usd'))
  const currencyIcon = screen.getByLabelText(/dollar sign/i)
  expect(euroOption).not.toBeVisible()
  expect(usdOption).not.toBeVisible()
  expect(currencyIcon).toBeVisible()

  user.click(button)
  expect(euroOption).toBeVisible()
  expect(usdOption).toBeVisible()
})

test('it switches selected currency', () => {
  renderComponent()
  const button = screen.getByRole('button', {
    name: /toggle currency dropdown/i,
  })
  const euroOption = screen.getByText(new RegExp('eur'))
  const euroIconInit = screen.queryByLabelText(/euro sign/i)

  expect(euroIconInit).toBeNull()

  user.click(button)
  user.click(euroOption)

  const euroIcon = screen.getByLabelText(/euro sign/i)
  expect(euroIcon).toBeVisible()
})
