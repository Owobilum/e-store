import { Box, Heading, Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { useEffect, ReactElement } from 'react'
import { fetchProductsByCategory } from './productSlice'
import ProductCard from './ProductCard'
import useProduct from '../../common/hooks/useProduct'
import ProductCardSkeleton from '../../common/components/skeletons/ProductCardSkeleton'

function ProductsPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const { products, currentCategory, status, error } = useProduct()

  useEffect(() => {
    dispatch(fetchProductsByCategory(currentCategory))
  }, [dispatch, currentCategory])

  let content
  if (status === 'loading') {
    content = Array.from(Array(6).keys()).map((i) => (
      <ProductCardSkeleton key={i} />
    ))
  } else if (status === 'succeeded' && products?.length) {
    content = products.map((product, index) => {
      return <ProductCard key={index} product={product} />
    })
  } else if (status === 'failed') {
    content = error
  } else {
    content = 'No products found.'
  }

  return (
    <Box p={[4]} pb="15%">
      <Heading textTransform="capitalize" mb={24}>
        {currentCategory}
      </Heading>
      <Flex gap={[6, 10, 12, 20]} flexWrap="wrap">
        {content}
      </Flex>
    </Box>
  )
}

export default ProductsPage
