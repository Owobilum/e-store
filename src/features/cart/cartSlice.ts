import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, CartItemType, SizeType } from '../../types'

export interface CartState {
  isCartPopoverActive: boolean
  cart: CartItemType[]
}

const initialState: CartState = {
  isCartPopoverActive: false,
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleIsCartPopoverActive: (state) => {
      state.isCartPopoverActive = !state.isCartPopoverActive
    },
    addToCart: (
      state,
      action: PayloadAction<{ product: ProductType; size: SizeType }>
    ) => {
      if (state.cart.some((item) => item.id === action.payload.product.id)) {
        const newCart = state.cart.map((item) => {
          if (item.id === action.payload.product.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })

        state.cart = newCart
        return
      }
      state.cart.push({
        ...action.payload.product,
        quantity: 1,
        size: action.payload.size,
      })
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const newCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      const updatedCart = newCart.filter((item) => item.quantity !== 0)
      state.cart = updatedCart
    },
    clearFromCart: (state, action: PayloadAction<ProductType>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    setSize: (
      state,
      action: PayloadAction<{ item: CartItemType; size: SizeType }>
    ) => {
      state.cart = state.cart.map((cartItem) => {
        if (action.payload.item.id === cartItem.id) {
          return { ...cartItem, size: action.payload.size }
        }
        return { ...cartItem }
      })
    },
  },
  extraReducers: (builder) => {},
})

export const { toggleIsCartPopoverActive, addToCart, removeFromCart, setSize } =
  cartSlice.actions

export default cartSlice.reducer
