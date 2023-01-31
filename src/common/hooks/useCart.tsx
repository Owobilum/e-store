import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { useMemo } from 'react'
import useCurrency from './useCurrency'
import { DOLLAR_EURO_RATE } from '../constants'

const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const { selectedCurrency } = useCurrency()

  const numberOfItemsInCart = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const totalAmount = useMemo(() => {
    if (selectedCurrency === 'eur') {
      return cart
        .reduce(
          (total, item) =>
            +item.price * item.quantity * DOLLAR_EURO_RATE + total,
          0
        )
        .toFixed(2)
    }
    return cart
      .reduce((total, item) => +item.price * item.quantity + total, 0)
      .toFixed(2)
  }, [cart, selectedCurrency])

  const newCart = useMemo(() => {
    if (selectedCurrency === 'eur') {
      return cart.map((item) => ({
        ...item,
        price: String((Number(item.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }))
    }
    return cart
  }, [cart, selectedCurrency])

  return {
    cart: newCart,
    numberOfItemsInCart,
    totalAmount,
  }
}

export default useCart
