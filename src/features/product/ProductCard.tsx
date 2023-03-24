import type { FC } from 'react'
import {
  useTheme,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
  useBoolean,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import type { IProduct } from '../../types'
import { CartIcon } from '../../common/components/icons/CartIcon'
import { formatCurrency } from '../../utils'

const ProductCard: FC<{
  product: IProduct
  onClick: () => void
}> = (props) => {
  const { product, onClick } = props
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useBoolean()
  const theme = useTheme()

  return (
    <Card
      w={['100%', '100%', '19.3125rem', '25rem']}
      h="25rem"
      pb="1rem"
      borderRadius="none"
      position="relative"
      cursor="pointer"
      variant={isHovered ? 'elevated' : 'unstyled'}
      onMouseEnter={() => setIsHovered.on()}
      onMouseLeave={() => setIsHovered.off()}
      onClick={() => navigate(`/${product.title}/${product.id}`)}
      data-testid="product-card"
    >
      <CardBody sx={{ p: 0, _hover: { p: 4 }, transition: '0.25s all ease' }}>
        <Image
          src={product.image}
          alt={product?.description}
          sx={{
            objectFit: 'cover',
            objectPosition: 'top left',
            height: '15.625rem',
            width: '100%',
          }}
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
          <Text>{formatCurrency(Number(product.price))}</Text>
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
            display="grid"
            placeItems="center"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
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
