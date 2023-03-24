import { useMemo } from 'react'

import { TAX_RATE } from '../../../common/constants'
import {
  addToCart,
  selectCart,
  selectIsPopoverActive,
  setSize,
  toggleIsCartPopoverActive,
  updateQuantity,
} from '../cartSlice'
import type { IProduct, SizeType } from '../../../types'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const isCartPopoverActive = useAppSelector(selectIsPopoverActive)

  const numberOfItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalAmount = useMemo(() => {
    return cart
      .reduce((total, item) => +item.price * item.quantity + total, 0)
      .toFixed(2)
  }, [cart])

  const calculateTax = (): number => {
    return +totalAmount * TAX_RATE
  }

  const finalTotal = Number(totalAmount) + calculateTax()

  const toggleCartPopover = () => dispatch(toggleIsCartPopoverActive())

  const setItemSize = (id: number, size: SizeType) =>
    dispatch(setSize({ id, size }))

  const updateItemQuantity = (id: number, type: 'increase' | 'decrease') =>
    dispatch(updateQuantity({ id, type }))

  const addItemToCart = (product: IProduct, size: SizeType) =>
    dispatch(addToCart({ product, size }))

  return {
    cart,
    numberOfItemsInCart,
    totalAmount,
    tax: calculateTax(),
    finalTotal,
    toggleCartPopover,
    isCartPopoverActive,
    setItemSize,
    updateItemQuantity,
    addItemToCart,
  }
}

export default useCart
