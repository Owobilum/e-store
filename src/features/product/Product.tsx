import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react'
import { FC, useState, ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import ProductSkeleton from '../../common/components/skeletons/ProductSkeleton'
import useCart from '../cart/hooks/useCart'
import { formatCurrency } from '../../utils'
import type { SizeType } from '../../types'
import { useGetProductByIdQuery } from './productSlice'
import { DEFAULT_SIZE } from '../../common/constants'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const Product: FC = () => {
  const { productId } = useParams()
  const [selectedSize, setSelectedSize] = useState<SizeType>(DEFAULT_SIZE)
  const { addItemToCart } = useCart()
  const {
    data: product,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetProductByIdQuery(productId || '')

  const renderedSizes = sizes?.map((size) => (
    <Button
      key={size}
      sx={{
        background: selectedSize === size ? 'black' : 'white',
        rounded: 'none',
        h: ['2.8125rem'],
        w: ['3.9375rem'],
        color: selectedSize === size ? 'white' : 'black',
        fontWeight: selectedSize === size ? 700 : 400,
        mr: 1,
        mb: 1,
        fontSize: [12, 16],
        border: '.0625rem solid black',
        textTransform: 'uppercase',
      }}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </Button>
  ))

  let content: ReactNode
  if (isLoading) {
    content = <ProductSkeleton />
  } else if (isSuccess && product) {
    content = (
      <Grid templateColumns="repeat(12, 1fr)" gap={[4, 8]}>
        <GridItem colSpan={[12, 6]}>
          <Image
            src={product?.image}
            height={[400, 560]}
            alt="product image"
            width="100%"
            objectFit="cover"
            objectPosition="center"
          />
        </GridItem>
        <GridItem colSpan={[12, 6]}>
          <Heading
            fontSize={[20, 30]}
            lineHeight={[5, 7]}
            fontWeight={600}
            mb={4}
          >
            {product?.title}
          </Heading>
          <Text
            fontSize={[20, 30]}
            lineHeight={[5, 7]}
            mb={4}
            textTransform="capitalize"
          >
            {product?.category}
          </Text>
          <Box mt={8}>
            <Text
              fontSize="1.125rem"
              lineHeight="1.125rem"
              fontWeight="normal"
              mb={4}
            >
              Size:
            </Text>
            <Text>{renderedSizes}</Text>
          </Box>
          <Text
            fontSize={'1.125rem'}
            fontWeight={'bold'}
            lineHeight="1.125rem"
            mt={8}
            mb={4}
          >
            Price:
          </Text>
          <Text fontSize={'1.5rem'} fontWeight={'bold'} lineHeight="1.5rem">
            {formatCurrency(Number(product?.price))}
          </Text>

          <Button
            colorScheme={'primary'}
            w={['100%']}
            h={['3.25rem']}
            rounded="none"
            textTransform="uppercase"
            my={8}
            onClick={() => product && addItemToCart(product, selectedSize)}
          >
            add to cart
          </Button>
          <Text my={4}>{product?.description}</Text>
        </GridItem>
      </Grid>
    )
  } else if (isError && error && 'status' in error && 'error' in error) {
    content = <Box color="red.400">{error.error}</Box>
  } else {
    content = 'Problem loading product'
  }

  return <>{content}</>
}

export default Product
