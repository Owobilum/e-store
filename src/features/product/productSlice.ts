import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductCategoryType, IProduct } from '../../types'
import { apiSlice } from '../api/apiSlice'
import { RootState } from '../../app/store'

interface ProductState {
  currentCategory: ProductCategoryType
  product: IProduct | null
  products: Array<IProduct> | null
}

const initialState: ProductState = {
  currentCategory: "women's clothing",
  products: null,
  product: null,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category: ProductCategoryType) =>
        `/products/category/${category}`,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
    getProductById: builder.query({
      query: (id: string) => `products/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
  }),
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ProductCategoryType>) => {
      state.currentCategory = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const selectCurrentCategory = (state: RootState) =>
  state.product.currentCategory

export const { useGetProductsByCategoryQuery, useGetProductByIdQuery } =
  extendedApiSlice

export const { setCategory } = productSlice.actions

export default productSlice.reducer
