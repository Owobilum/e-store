import Badge from './Badge'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'

test('it displays cart icon and fires click event', () => {
  const mock = jest.fn()
  render(<Badge fontSize={16} fill="" handleClick={mock} />)
  const icon = screen.getByLabelText(/cart icon/i)
  expect(icon).toBeInTheDocument()

  user.click(icon)
  expect(mock).toHaveBeenCalled()
})
