import { ReactElement, useEffect } from 'react'
import { Box, Heading, Text, Button, Spinner, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import CartItem from './CartItem'
import useCart from './hooks/useCart'
import { formatCurrency } from '../../utils'
import { TAX_RATE } from '../../common/constants'
import { useAppDispatch } from '../../app/hooks'
import { emptyCart } from './cartSlice'

function Cart(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const {
    cart,
    totalAmount,
    tax,
    numberOfItemsInCart,
    finalTotal,
    handlePlaceOrder,
    status: { isLoading, isError, isSuccess, error },
  } = useCart()

  const isShowErrorToast =
    isError && error && 'status' in error && 'error' in error

  useEffect(() => {
    if (!isSuccess) return
    toast({
      title: 'Success',
      description: 'Your order has been received',
      status: 'success',
    })
    dispatch(emptyCart())
    navigate('/')
  }, [dispatch, isSuccess, navigate, toast])

  useEffect(() => {
    if (!isShowErrorToast) return
    toast({
      title: 'Error',
      description: error.error ?? 'Could not place order',
      status: 'error',
      isClosable: true,
    })
  }, [error, isShowErrorToast, toast])

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
        <Text as="b">{formatCurrency(tax)}</Text>
      </Text>
      <Text fontSize={24}>
        Quantity: <Text as="b">{numberOfItemsInCart}</Text>{' '}
      </Text>
      <Text fontSize={24}>
        Sub total: <Text as="b">{formatCurrency(+totalAmount)}</Text>
      </Text>
      <Text fontSize={24}>
        Total: <Text as="b">{formatCurrency(finalTotal)}</Text>
      </Text>
      <Button
        colorScheme="primary"
        textTransform="uppercase"
        rounded="none"
        w={['100%', '17.4375rem']}
        h="2.6875rem"
        my={4}
        onClick={handlePlaceOrder}
        disabled={isLoading || numberOfItemsInCart < 1}
      >
        {isLoading ? <Spinner size="sm" /> : 'place order'}
      </Button>
    </Box>
  )
}

export default Cart
