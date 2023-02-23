import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import ProductSkeleton from '../../common/components/skeletons/ProductSkeleton'
import useCart from '../../common/hooks/useCart'
import useCurrency from '../../common/hooks/useCurrency'
import useProduct from '../../common/hooks/useProduct'
import useProductById from '../../common/hooks/useProductById'
import { formatCurrency } from '../../common/utils'
import type { SizeType, ViewType } from '../../types'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const productViews: { angle: ViewType }[] = [
  { angle: 'top left' },
  { angle: 'top right' },
  { angle: 'bottom right' },
]

const Product: FC = () => {
  const { productId } = useParams()
  const { selectedSize, selectedView, setSelectedSize, setSelectedView } =
    useProductById(productId)
  const { product, status, error } = useProduct()
  const { selectedCurrency } = useCurrency()
  const { addItemToCart } = useCart()

  const renderedViews = productViews.map(({ angle }, i) => (
    <Image
      key={i}
      src={product?.image}
      width={[88]}
      height={[88]}
      background="gray.100"
      cursor="pointer"
      objectFit="cover"
      objectPosition={angle}
      onClick={() => setSelectedView(angle)}
      border={selectedView === angle ? '.0625rem solid black' : 'none'}
    />
  ))

  const renderedSizes = sizes?.map((size) => (
    <Button
      key={size}
      sx={{
        background: selectedSize === size ? 'black' : 'white',
        rounded: 'none',
        h: ['2.8125rem'],
        w: ['3.9375rem'],
        color: selectedSize === size ? 'white' : 'black',
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

  if (status === 'loading') return <ProductSkeleton />

  if (status === 'failed') return <div>{error}</div>

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={[4, 8]}>
      <GridItem colSpan={[12, 2]}>
        <Flex direction={['row', 'column']} gap={4}>
          {renderedViews}
        </Flex>
      </GridItem>
      <GridItem colSpan={[12, 6]}>
        <Image
          src={product?.image}
          height={[400, 560]}
          width="100%"
          objectFit="cover"
          objectPosition={selectedView}
        />
      </GridItem>
      <GridItem colSpan={[12, 4]}>
        <Text fontSize={[20, 30]} lineHeight={[5, 7]} fontWeight={600} mb={4}>
          {product?.title}
        </Text>
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
          {formatCurrency(Number(product?.price), selectedCurrency)}
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
}

export default Product
