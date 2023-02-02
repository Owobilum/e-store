import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../../app/store'
import { DEFAULT_SIZE } from '../../common/constants'
import useCurrency from '../../common/hooks/useCurrency'
import useProduct from '../../common/hooks/useProduct'
import { formatCurrency } from '../../common/utils'
import { SizeType, ViewType } from '../../types'
import { addToCart } from '../cart/cartSlice'
import { fetchProductById } from './productSlice'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const productViews: { angle: ViewType }[] = [
  { angle: 'top left' },
  { angle: 'top right' },
  { angle: 'bottom right' },
]

const Product: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { productId } = useParams()
  const { product } = useProduct()
  const { selectedCurrency } = useCurrency()
  const [selectedSize, setSelectedSize] = useState<SizeType>(DEFAULT_SIZE)
  const [selectedView, setSelectedView] = useState<ViewType>('top left')

  useEffect(() => {
    productId && dispatch(fetchProductById(productId))
  }, [dispatch, productId])

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={[4, 8]}>
      <GridItem colSpan={[12, 2]}>
        <Flex direction={['row', 'column']} gap={4}>
          {productViews.map(({ angle }, i) => (
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
              border={selectedView === angle ? '1px solid black' : 'none'}
            />
          ))}
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
          <Text fontSize="18px" lineHeight="18px" fontWeight="normal" mb={4}>
            Size:
          </Text>
          <Text>
            {sizes?.map((size) => (
              <Button
                key={size}
                sx={{
                  background: selectedSize === size ? 'black' : 'white',
                  rounded: 'none',
                  h: ['45px'],
                  w: ['63px'],
                  color: selectedSize === size ? 'white' : 'black',
                  mr: 1,
                  mb: 1,
                  fontSize: [12, 16],
                  border: '1px solid black',
                  textTransform: 'uppercase',
                }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </Text>
        </Box>
        <Text
          fontSize={'18px'}
          fontWeight={'bold'}
          lineHeight="18px"
          mt={8}
          mb={4}
        >
          Price:
        </Text>
        <Text fontSize={'24px'} fontWeight={'bold'} lineHeight="24px">
          {formatCurrency(Number(product?.price), selectedCurrency)}
        </Text>

        <Button
          colorScheme={'primary'}
          w={['100%']}
          h={['52px']}
          rounded="none"
          textTransform="uppercase"
          my={8}
          onClick={() =>
            product && dispatch(addToCart({ product, size: selectedSize }))
          }
        >
          add to cart
        </Button>

        <Text my={4}>{product?.description}</Text>
      </GridItem>
    </Grid>
  )
}

export default Product
