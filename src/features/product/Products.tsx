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
import { useState, useEffect, ReactElement } from 'react'
import type { FC } from 'react'
import { fetchProductsByCategory } from './productSlice'
import type { ProductType } from '../../types'
import { addToCart } from '../cart/cartSlice'
import { CartIcon } from '../../common/components/icons/CartIcon'
import { useNavigate } from 'react-router-dom'

const ProductCard: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const theme = useTheme()

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  return (
    <Card
      w="sm"
      pb={4}
      borderRadius="none"
      position="relative"
      cursor="pointer"
      variant={isHovered ? 'elevated' : 'unstyled'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate(`/${product.title}`)
      }}
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
            onClick={(e) => handleClick(e)}
            display="grid"
            placeItems="center"
          >
            <Box
              sx={{
                // position: 'absolute',
                // top: '15%',
                // left: '-19%',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <CartIcon fill="white" fontSize={24} />
            </Box>
          </Box>
        )}
      </CardBody>
    </Card>
  )
}

function Products(): ReactElement {
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
