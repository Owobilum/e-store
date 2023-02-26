import { useMemo, useState } from 'react'

import useCurrency from './useCurrency'
import { DOLLAR_EURO_RATE, TAX_RATE } from '../constants'
import {
  addToCart,
  setSize,
  toggleIsCartPopoverActive,
  updateQuantity,
} from '../../features/cart/cartSlice'
import type { IProduct, ProductViewType, SizeType, ViewType } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const useCart = () => {
  const dispatch = useAppDispatch()
  const { cart, isCartPopoverActive } = useAppSelector((state) => state.cart)
  const { selectedCurrency } = useCurrency()
  const [selectedView, setSelectedView] = useState<ViewType>('top right')

  const switchView = (
    productViews: ProductViewType,
    direction: 'forward' | 'backward'
  ) => {
    const index = productViews.findIndex(({ angle }) => angle === selectedView)
    if (direction === 'forward' && productViews.length > index + 1) {
      setSelectedView(productViews[index + 1].angle)
    } else if (direction === 'backward' && index > 0) {
      setSelectedView(productViews[index - 1].angle)
    }
  }

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

  const calculateTax = (): number => {
    if (selectedCurrency === 'eur')
      return +totalAmount * TAX_RATE * DOLLAR_EURO_RATE
    return +totalAmount * TAX_RATE
  }

  const newCart = useMemo(() => {
    if (selectedCurrency === 'eur') {
      return cart.map((item) => ({
        ...item,
        price: String((Number(item.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }))
    }
    return cart
  }, [cart, selectedCurrency])

  const finalTotal = Number(totalAmount) + calculateTax()

  const toggleCartPopover = () => dispatch(toggleIsCartPopoverActive())

  const setItemSize = (id: number, size: SizeType) =>
    dispatch(setSize({ id, size }))

  const updateItemQuantity = (id: number, type: 'increase' | 'decrease') =>
    dispatch(updateQuantity({ id, type }))

  const addItemToCart = (product: IProduct, size: SizeType) =>
    dispatch(addToCart({ product, size }))

  return {
    cart: newCart,
    numberOfItemsInCart,
    totalAmount,
    tax: calculateTax(),
    finalTotal,
    toggleCartPopover,
    isCartPopoverActive,
    switchView,
    selectedView,
    setItemSize,
    updateItemQuantity,
    addItemToCart,
  }
}

export default useCart
