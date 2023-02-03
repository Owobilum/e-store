import { Box, Heading, Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { useEffect, ReactElement } from 'react'
import { fetchProductsByCategory } from './productSlice'
import ProductCard from './ProductCard'
import useProduct from '../../common/hooks/useProduct'

function ProductsPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const { products, currentCategory } = useProduct()

  useEffect(() => {
    dispatch(fetchProductsByCategory(currentCategory))
  }, [dispatch, currentCategory])

  return (
    <Box p={[4]} pb="15%">
      <Heading textTransform="capitalize" mb={24}>
        {currentCategory}
      </Heading>
      <Flex gap={[6, 10, 12, 20]} flexWrap="wrap">
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
