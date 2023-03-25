import { Container, Box } from '@chakra-ui/react'
import { FC, useEffect, PropsWithChildren, ReactElement } from 'react'

import Header from '../header/Header'
import useCart from '../../../features/cart/hooks/useCart'
import CartPopover from '../../../features/cart/CartPopover'

function Layout(props: PropsWithChildren): ReactElement {
  const { children } = props
  const { isCartPopoverActive } = useCart()

  return (
    <Container maxW="120rem" px={['5%']}>
      <Header />
      {isCartPopoverActive && (
        <>
          <Overlay />
          <CartPopover />
        </>
      )}

      {children}
    </Container>
  )
}

const Overlay: FC = () => {
  const { isCartPopoverActive, toggleCartPopover } = useCart()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.document) return
    if (isCartPopoverActive) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isCartPopoverActive])

  return (
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
  )
}

export default Layout
