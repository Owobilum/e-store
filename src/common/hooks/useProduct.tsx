import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '../../app/store'
import { setCategory } from '../../features/product/productSlice'
import type { ProductCategoryType } from '../../types'
import { DOLLAR_EURO_RATE } from '../constants'

const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, currency, currentCategory, product, status, error } =
    useSelector((state: RootState) => state.product)

  const newProducts = useMemo(() => {
    if (!products) return null
    let newProd = products
    if (currency === 'eur') {
      newProd = products.map((product) => ({
        ...product,
        price: String((Number(product.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }))
    }
    return newProd
  }, [currency, products])

  const transformProduct = () => {
    if (!product) return null
    let newProd = product
    if (currency === 'eur') {
      newProd = {
        ...product,
        price: String((Number(product.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }
    }
    return newProd
  }

  const setProductCategory = (category: ProductCategoryType) =>
    dispatch(setCategory(category))

  return {
    products: newProducts,
    currentCategory,
    product: transformProduct(),
    status,
    error,
    setProductCategory,
  }
}

export default useProduct
