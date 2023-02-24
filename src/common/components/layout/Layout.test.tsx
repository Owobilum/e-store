import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { renderWithProviders } from '../../../utils/test-utils'
import Layout from './Layout'

test('shows cart popover over ui', () => {
  renderWithProviders(
    <Layout>
      <div />
    </Layout>
  )

  const cart = screen.getByLabelText(/cart icon/i)
  user.click(cart)
  const viewBagBtn = screen.getByRole('button', { name: /view bag/i })
  expect(viewBagBtn).toBeInTheDocument()
})
