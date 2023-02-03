import { ReactElement } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import CartItem from './CartItem'
import useCart from '../../common/hooks/useCart'
import useCurrency from '../../common/hooks/useCurrency'
import { formatCurrency } from '../../common/utils'
import { TAX_RATE } from '../../common/constants'

function CartPage(): ReactElement {
  const { cart, totalAmount, tax, numberOfItemsInCart, finalTotal } = useCart()
  const { selectedCurrency } = useCurrency()
  return (
    <Box pb={'20%'}>
      <Heading textTransform="uppercase" mb={8}>
        {' '}
        Cart
      </Heading>
      {cart.map((item, i) => (
        <CartItem key={i} item={item} />
      ))}
      <hr />
      <Text fontSize={24} pt={8}>
        Tax {`(${TAX_RATE * 100}%): `}
        <Text as="b">{formatCurrency(tax, selectedCurrency)}</Text>
      </Text>
      <Text fontSize={24}>
        Quantity: <Text as="b">{numberOfItemsInCart}</Text>{' '}
      </Text>
      <Text fontSize={24}>
        Sub total:{' '}
        <Text as="b">{formatCurrency(+totalAmount, selectedCurrency)}</Text>
      </Text>
      <Text fontSize={24}>
        Total:{' '}
        <Text as="b">{formatCurrency(finalTotal, selectedCurrency)}</Text>
      </Text>
      <Button
        colorScheme="primary"
        textTransform="uppercase"
        rounded="none"
        w={['100%', '17.4375rem']}
        h="2.6875rem"
        my={4}
      >
        order
      </Button>
    </Box>
  )
}

export default CartPage
