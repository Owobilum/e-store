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

// export const fetchProductsByCategory = createAsyncThunk(
//   'product/fetchByCategory',
//   async (category: ProductCategoryType, thunkAPI) => {
//     const response = await axiosInstance.get(`/products/category/${category}`)
//     return response.data
//   }
// )

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsCartPopoverActive: (state) => {
      state.isCartPopoverActive = !state.isCartPopoverActive
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
    //   //   state.products.push(action.payload)
    //   state.products = action.payload
    // })
  },
})

export const { setIsCartPopoverActive } = cartSlice.actions

export default cartSlice.reducer
