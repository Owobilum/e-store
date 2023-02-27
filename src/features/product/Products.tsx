import { Box, Heading, Flex } from '@chakra-ui/react'
import { ReactElement } from 'react'

import ProductCard from './ProductCard'
import useProduct from '../../common/hooks/useProduct'
import ProductCardSkeleton from '../../common/components/skeletons/ProductCardSkeleton'
import useCart from '../../common/hooks/useCart'
import { DEFAULT_SIZE } from '../../common/constants'
import useProductsByCategory from '../../common/hooks/useProductByCategory'

function Products(): ReactElement {
  const { products, currentCategory, status, error } = useProduct()
  const { addItemToCart } = useCart()
  useProductsByCategory(currentCategory)

  let content
  if (status === 'loading') {
    content = Array.from(Array(6).keys()).map((i) => (
      <ProductCardSkeleton key={i} />
    ))
  } else if (status === 'succeeded' && products?.length) {
    content = products.map((product, index) => {
      return (
        <ProductCard
          key={index}
          product={product}
          onClick={() => addItemToCart(product, DEFAULT_SIZE)}
        />
      )
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
      <Flex gap={[6, 10, 12, 20]} flexWrap="wrap" justifyContent="space-evenly">
        {content}
      </Flex>
    </Box>
  )
}

export default Products
