import { Box, Heading, Flex } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'

import ProductCard from './ProductCard'
import ProductCardSkeleton from '../../common/components/skeletons/ProductCardSkeleton'
import useCart from '../cart/hooks/useCart'
import { DEFAULT_SIZE } from '../../common/constants'
import {
  selectCurrentCategory,
  useGetProductsByCategoryQuery,
} from './productSlice'
import { IProduct } from '../../types'
import { useAppSelector } from '../../app/hooks'

function Products(): ReactElement {
  const currentCategory = useAppSelector(selectCurrentCategory)
  const { addItemToCart } = useCart()
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetProductsByCategoryQuery(currentCategory)

  let content: ReactNode
  if (isLoading) {
    content = Array.from(Array(6).keys()).map((i) => (
      <ProductCardSkeleton key={i} />
    ))
  } else if (isSuccess && products?.length) {
    content = products.map((product: IProduct, index: number) => {
      return (
        <ProductCard
          key={index}
          product={product}
          onClick={() => addItemToCart(product, DEFAULT_SIZE)}
        />
      )
    })
  } else if (isError && error && 'status' in error && 'error' in error) {
    content = error.error
  } else {
    content = 'No products found.'
  }

  return (
    <Box p={[4]} pb="15%">
      <Heading textTransform="capitalize" mb={24}>
        {currentCategory}
      </Heading>
      <Flex
        columnGap={['2%']}
        rowGap={[8, 10, 12, 20]}
        flexWrap="wrap"
        justifyContent="space-evenly"
        color={isError ? 'red.400' : 'black'}
      >
        {content}
      </Flex>
    </Box>
  )
}

export default Products
