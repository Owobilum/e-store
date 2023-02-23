import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'

import { fetchProductById } from '../../features/product/productSlice'
import type { SizeType, ViewType } from '../../types'
import { DEFAULT_SIZE } from '../constants'

const useProductById = (productId?: string) => {
  const [selectedSize, setSelectedSize] = useState<SizeType>(DEFAULT_SIZE)
  const [selectedView, setSelectedView] = useState<ViewType>('top left')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    productId && dispatch(fetchProductById(productId))
  }, [dispatch, productId])

  return {
    selectedSize,
    setSelectedSize,
    selectedView,
    setSelectedView,
  }
}

export default useProductById
