import { ReactElement } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import CartItem from './CartItem'

function CartPage(): ReactElement {
  return (
    <Box pb={'20%'}>
      <Heading textTransform="uppercase" mb={8}>
        {' '}
        Cart
      </Heading>

      <CartItem />
      <CartItem />
      <CartItem />

      <hr />
      <Text fontSize={24} pt={8}>
        Tax 21%: <Text as="b">$42.00</Text>
      </Text>
      <Text fontSize={24}>
        Quantity: <Text as="b">3</Text>{' '}
      </Text>
      <Text fontSize={24}>
        Total: <Text as="b">$200.00</Text>
      </Text>
      <Button
        colorScheme="primary"
        textTransform="uppercase"
        rounded="none"
        w={['100%', '279px']}
        h="43px"
        my={4}
      >
        order
      </Button>
    </Box>
  )
}

export default CartPage
