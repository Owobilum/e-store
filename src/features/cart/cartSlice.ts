import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../api'
import type { ProductType, CartItemType } from '../../types'

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
    setIsCartPopoverActive: (state) => {
      state.isCartPopoverActive = !state.isCartPopoverActive
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        const newCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })

        state.cart = newCart
        return
      }
      state.cart.push({ ...action.payload, quantity: 1 })
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
  },
  extraReducers: (builder) => {},
})

export const { setIsCartPopoverActive, addToCart, removeFromCart } =
  cartSlice.actions

export default cartSlice.reducer
