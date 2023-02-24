import { screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import Header from './Header'

it('renders a nav section with 2 navigation options', () => {
  renderWithProviders(<Header />)
  const nav = screen.getByRole('navigation')
  const navOptions = within(nav).getAllByRole('button')

  expect(navOptions).toHaveLength(2)
})

it('clicking on a nav option fires an event', () => {
  renderWithProviders(<Header />)
  const nav = screen.getByRole('navigation')
  const navOptions = within(nav).getAllByRole('button')

  user.click(navOptions[1])
  expect(navOptions[0]).toHaveStyle({
    'border-bottom': '0',
  })

  user.click(navOptions[0])
  expect(navOptions[0]).not.toHaveStyle({
    'border-bottom': '0',
  })
})
