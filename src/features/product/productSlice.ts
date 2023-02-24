import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CurrencyType, ProductCategoryType, IProduct } from '../../types'
import axiosInstance from '../../api'
import { DEFAULT_ERROR_MESSAGE } from '../../common/constants'

interface ProductState {
  currency: CurrencyType
  currentCategory: ProductCategoryType
  product: IProduct | null
  products: Array<IProduct> | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductState = {
  currentCategory: "women's clothing",
  products: null,
  product: null,
  currency: 'usd',
  status: 'idle',
  error: null,
}

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchByCategory',
  async (category: ProductCategoryType, thunkAPI) => {
    const response = await axiosInstance.get(`/products/category/${category}`)
    return response.data
  }
)

export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (id: string) => {
    const response = await axiosInstance.get(`products/${id}`)
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
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || DEFAULT_ERROR_MESSAGE
      state.products = []
    })
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || DEFAULT_ERROR_MESSAGE
      state.product = null
    })
  },
})

export const { setCategory, setCurrrency } = productSlice.actions

export default productSlice.reducer
