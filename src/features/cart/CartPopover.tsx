import { FC } from 'react'
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import useCart from '../../common/hooks/useCart'
import CartPopoverItem from './CartPopoverItem'
import useCurrency from '../../common/hooks/useCurrency'
import { formatCurrency } from '../../common/utils'

const CartPopover: FC = () => {
  const navigate = useNavigate()
  const { cart, numberOfItemsInCart, totalAmount, toggleCartPopover } =
    useCart()
  const { selectedCurrency } = useCurrency()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        right: 0,
        height: 20,
        zIndex: 3,
        w: '20.3125rem',
        overflowY: 'auto',
        p: 2,
        h: ['25rem', '37.5rem'],
        bg: 'white',
      }}
    >
      <Heading fontSize={[14, 18]} sx={{ py: 4 }}>
        My Bag, {numberOfItemsInCart} items
      </Heading>
      {cart?.length
        ? cart.map((item) => <CartPopoverItem key={item.id} item={item} />)
        : 'No items in cart'}

      <Flex justifyContent="space-between" my={2}>
        <Text>Total:</Text>{' '}
        <Text>{formatCurrency(Number(totalAmount), selectedCurrency)}</Text>
      </Flex>
      <Flex justifyContent="space-between" my={2}>
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          rounded="none"
          onClick={() => {
            toggleCartPopover()
            navigate('/cart')
          }}
        >
          View Bag
        </Button>
      </Flex>
    </Box>
  )
}

export default CartPopover
