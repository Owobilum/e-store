import { FC, useState } from 'react'
import {
  useTheme,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { ProductType } from '../../types'
import type { AppDispatch } from '../../app/store'
import { CartIcon } from '../../common/components/icons/CartIcon'
import { addToCart } from '../cart/cartSlice'
import useCurrency from '../../common/hooks/useCurrency'
import { DEFAULT_SIZE } from '../../common/constants'
import { formatCurrency } from '../../common/utils'

const ProductCard: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { selectedCurrency } = useCurrency()
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(addToCart({ product, size: DEFAULT_SIZE }))
  }

  return (
    <Card
      // w="sm"
      sx={{ w: ['100%', '100%', 325, 400] }}
      h={400}
      pb={[16]}
      borderRadius="none"
      position="relative"
      cursor="pointer"
      variant={isHovered ? 'elevated' : 'unstyled'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate(`/${product.title}/${product.id}`)
      }}
    >
      <CardBody sx={{ p: 0, _hover: { p: 4 }, transition: '0.25s all ease' }}>
        <Image
          src={product.image}
          alt={product?.description}
          sx={{ objectFit: 'cover', height: '250px', width: '100%' }}
        />
        <Stack mt="6" spacing="3" pl={1}>
          <Heading
            size="md"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {product.title}
          </Heading>
          <Text>{formatCurrency(Number(product.price), selectedCurrency)}</Text>
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
            display="grid"
            placeItems="center"
          >
            <Box
              sx={{
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

export default ProductCard
