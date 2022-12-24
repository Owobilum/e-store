import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useTheme,
  Flex,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { fetchProductsByCategory } from './productSlice'
import type { CartItemType, ProductType } from '../../types'
import { addToCart } from '../cart/cartSlice'

const ProductCard: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    dispatch(addToCart(product))
  }

  return (
    <Card
      // maxW="sm"
      w="sm"
      pb={4}
      borderRadius="none"
      position="relative"
      variant={isHovered ? 'elevated' : 'unstyled'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardBody sx={{ p: !isHovered ? 0 : 4 }}>
        <Image
          src={product.image}
          alt={product?.description}
          sx={{ objectFit: 'cover', height: '250px', width: '100%' }}
        />
        <Stack mt="6" spacing="3" pl={1}>
          <Heading size="md">{product.title}</Heading>
          <Text>{product.price}</Text>
        </Stack>

        {isHovered && (
          <Box
            h={10}
            w={10}
            borderRadius="full"
            bg={theme.colors.primary.main}
            position="absolute"
            bottom={'28%'}
            right={'10%'}
            cursor="pointer"
            onClick={handleClick}
          ></Box>
        )}
      </CardBody>
    </Card>
  )
}

const Products = () => {
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

export default Products
