import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import ProductReducer from '../features/product/productSlice'
import CartReducer from '../features/cart/cartSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
