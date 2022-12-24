import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { useMemo } from 'react'

const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)

  const numberOfItemsInCart = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const totalAmount = useMemo(() => {
    return cart
      .reduce((total, item) => +item.price * item.quantity + total, 0)
      .toFixed(2)
  }, [cart])

  return { cart, numberOfItemsInCart, totalAmount }
}

export default useCart
