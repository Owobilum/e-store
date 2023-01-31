import { Box, Heading, Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { useEffect, ReactElement } from 'react'
import { fetchProductsByCategory } from './productSlice'
import ProductCard from './ProductCard'

function ProductsPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const { currentCategory, products } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    dispatch(fetchProductsByCategory(currentCategory))
  }, [dispatch, currentCategory])

  return (
    <Box p={[4]}>
      <Heading textTransform="capitalize" mb={10}>
        {currentCategory}
      </Heading>
      <Flex gap={6} flexWrap="wrap">
        {products?.length
          ? products.map((product, index) => {
              return <ProductCard key={index} product={product} />
            })
          : 'No Products Found'}
      </Flex>
    </Box>
  )
}

export default ProductsPage
