import { useEffect } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { fetchProductsByCategory } from '../../features/product/productSlice'
import type { ProductCategoryType } from '../../types'

const useProductsByCategory = (category: ProductCategoryType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProductsByCategory(category))
  }, [dispatch, category])
}

export default useProductsByCategory
