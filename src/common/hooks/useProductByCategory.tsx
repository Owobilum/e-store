import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { fetchProductsByCategory } from '../../features/product/productSlice'
import type { ProductCategoryType } from '../../types'

const useProductsByCategory = (category: ProductCategoryType) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsByCategory(category))
  }, [dispatch, category])
}

export default useProductsByCategory
