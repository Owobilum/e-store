import { FC, useEffect } from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import useCart from './hooks/useCart'
import CartPopoverItem from './CartPopoverItem'
import { formatCurrency } from '../../utils'
import { useAppDispatch } from '../../app/hooks'
import { emptyCart } from './cartSlice'

const CartPopover: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const {
    cart,
    numberOfItemsInCart,
    totalAmount,
    toggleCartPopover,
    handlePlaceOrder,
    status: { isSuccess, isLoading, isError, error },
  } = useCart()
  const isShowErrorToast =
    isError && error && 'status' in error && 'error' in error

  useEffect(() => {
    if (!isSuccess) return
    toast({
      title: 'Success',
      description: "You're order has been received",
      status: 'success',
    })
    dispatch(emptyCart())
    toggleCartPopover()
    navigate('/')
  })

  useEffect(() => {
    if (!isShowErrorToast) return
    toast({
      title: 'Error',
      description: error.error ?? 'Could not placing order',
      status: 'error',
      isClosable: true,
    })
  })

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
      <Heading
        fontSize={[14, 18]}
        sx={{
          py: 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>My Bag, {numberOfItemsInCart} item(s)</span>
        <CloseIcon
          fontSize={[10, 12]}
          cursor="pointer"
          onClick={toggleCartPopover}
        />
      </Heading>
      {cart?.length
        ? cart.map((item) => <CartPopoverItem key={item.id} item={item} />)
        : 'No items in cart'}

      <Flex justifyContent="space-between" my={2}>
        <Text>Total:</Text> <Text>{formatCurrency(Number(totalAmount))}</Text>
      </Flex>
      <Flex justifyContent="space-between" my={2}>
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          rounded="none"
          textTransform="capitalize"
          onClick={() => {
            toggleCartPopover()
            navigate('/cart')
          }}
          disabled={numberOfItemsInCart < 1}
        >
          view bag
        </Button>
        <Button
          variant="solid"
          colorScheme="primary"
          rounded="none"
          textTransform="capitalize"
          onClick={handlePlaceOrder}
          disabled={isLoading || numberOfItemsInCart < 1}
        >
          {isLoading ? <Spinner size="sm" /> : 'place order'}
        </Button>
      </Flex>
    </Box>
  )
}

export default CartPopover
