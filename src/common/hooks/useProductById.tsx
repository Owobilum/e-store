import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'

import { fetchProductById } from '../../features/product/productSlice'
import type { SizeType, ViewType } from '../../types'
import { DEFAULT_SIZE } from '../constants'

const useProductById = (productId?: string) => {
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<SizeType>(DEFAULT_SIZE)
  const [selectedView, setSelectedView] = useState<ViewType>('top left')

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
