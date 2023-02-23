import { Container, Box } from '@chakra-ui/react'
import type { ReactNode, FC } from 'react'

import Header from './Header'
import useCart from '../hooks/useCart'

const Layout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props
  const { toggleCartPopover, isCartPopoverActive } = useCart()

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
          onClick={toggleCartPopover}
        />
      )}

      {children}
    </Container>
  )
}

export default Layout
