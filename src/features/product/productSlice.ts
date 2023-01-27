import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  CurrencyType,
  ProductCategoryType,
  ProductType,
} from '../../types'
import axiosInstance from '../../api'

export interface ProductState {
  currentCategory: ProductCategoryType
  products: Array<ProductType>
  currency: CurrencyType
}

const initialState: ProductState = {
  currentCategory: "women's clothing",
  products: [],
  currency: 'usd',
}

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchByCategory',
  async (category: ProductCategoryType, thunkAPI) => {
    const response = await axiosInstance.get(`/products/category/${category}`)
    return response.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ProductCategoryType>) => {
      state.currentCategory = action.payload
    },
    setCurrrency: (state, action: PayloadAction<CurrencyType>) => {
      state.currency = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.products = action.payload
    })
  },
})

export const { setCategory, setCurrrency } = productSlice.actions

export default productSlice.reducer
