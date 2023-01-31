import { FC } from 'react'
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react'
import useCart from '../../common/hooks/useCart'
import CartPopoverItem from './CartPopoverItem'

const CartPopover: FC = () => {
  const { cart, numberOfItemsInCart, totalAmount } = useCart()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        right: 0,
        height: 20,
        zIndex: 5,
        w: '325px',
        overflowY: 'auto',
        p: 2,
        h: ['400px', '600px'],
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
        <Text>Total:</Text> <Text>${totalAmount}</Text>
      </Flex>
      <Flex justifyContent="space-between" my={2}>
        <Button variant="outline" colorScheme="blackAlpha" rounded="none">
          View Bag
        </Button>
        <Button variant="solid" colorScheme="primary" rounded="none">
          Checkout
        </Button>
      </Flex>
    </Box>
  )
}

export default CartPopover
