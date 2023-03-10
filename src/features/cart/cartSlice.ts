import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct, ICartItem, SizeType } from '../../types'

export interface CartState {
  isCartPopoverActive: boolean
  cart: ICartItem[]
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
      action: PayloadAction<{ product: IProduct; size: SizeType }>
    ) => {
      if (state.cart.some((item) => item.id === action.payload.product.id)) {
        const newCart = state.cart.map((item) => {
          if (item.id === action.payload.product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              size: action.payload.size,
            }
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
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; type: 'increase' | 'decrease' }>
    ) => {
      const newCart = state.cart.map((item) => {
        if (item.id !== action.payload.id) return item
        if (action.payload.type === 'increase')
          return { ...item, quantity: item.quantity + 1 }
        return { ...item, quantity: item.quantity - 1 }
      })
      state.cart = newCart.filter((item) => item.quantity !== 0)
    },
    clearFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    setSize: (state, action: PayloadAction<{ id: number; size: SizeType }>) => {
      state.cart = state.cart.map((cartItem) => {
        if (action.payload.id === cartItem.id) {
          return { ...cartItem, size: action.payload.size }
        }
        return { ...cartItem }
      })
    },
  },
  extraReducers: (builder) => {},
})

export const { toggleIsCartPopoverActive, addToCart, updateQuantity, setSize } =
  cartSlice.actions

export default cartSlice.reducer
