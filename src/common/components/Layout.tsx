import { Container, Box } from '@chakra-ui/react'
import type { ReactNode, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { toggleIsCartPopoverActive } from '../../features/cart/cartSlice'

import Header from './Header'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const isCartPopoverActive = useSelector(
    (state: RootState) => state.cart.isCartPopoverActive
  )

  return (
    <Container maxW="120rem" px={[4, 4, 4, 10]}>
      <Header />
      {isCartPopoverActive && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          top="6.25rem"
          backgroundColor="gray.500"
          opacity={0.5}
          zIndex={2}
          onClick={() => dispatch(toggleIsCartPopoverActive())}
        />
      )}

      {children}
    </Container>
  )
}

export default Layout
