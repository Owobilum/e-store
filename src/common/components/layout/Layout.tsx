import { Container, Box } from '@chakra-ui/react'
import type { ReactNode, FC } from 'react'

import Header from '../header/Header'
import useCart from '../../../features/cart/hooks/useCart'
import CartPopover from '../../../features/cart/CartPopover'

const Layout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props
  const { toggleCartPopover, isCartPopoverActive } = useCart()

  return (
    <Container maxW="120rem" px={['5%']}>
      <Header />
      {isCartPopoverActive && (
        <>
          <Box
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            top="6.25rem"
            backgroundColor="gray.500"
            opacity={0.5}
            zIndex={2}
            onClick={toggleCartPopover}
          />
          <CartPopover />
        </>
      )}

      {children}
    </Container>
  )
}

export default Layout
