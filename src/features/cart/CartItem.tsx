import { ReactElement } from 'react'
import { Flex, Box, Text, Button, Image } from '@chakra-ui/react'

import type { ICartItem, ProductViewType, SizeType } from '../../types'
import useCurrency from '../../common/hooks/useCurrency'
import { formatCurrency } from '../../utils'
import useCart from '../../common/hooks/useCart'

type DirectionType = 'forward' | 'backward'

const productViews: ProductViewType = [
  { angle: 'top right' },
  { angle: 'top left' },
  { angle: 'bottom right' },
]
const sizes: SizeType[] = ['xs', 's', 'm', 'l']
const directions: DirectionType[] = ['backward', 'forward']

const styles = {
  btn: {
    border: '1px solid black',
    rounded: 'none',
    colorScheme: 'whiteAlpha',
    color: 'black',
  },
}

function CartItem(props: { item: ICartItem }): ReactElement {
  const { item } = props
  const { selectedCurrency } = useCurrency()
  const { switchView, selectedView, setItemSize, updateItemQuantity } =
    useCart()

  const renderedSizes = sizes?.map((size) => (
    <Button
      key={size}
      sx={{
        background: item.size === size ? 'black' : 'white',
        rounded: 'none',
        h: ['2.8125rem'],
        w: ['3.9375rem'],
        color: item.size === size ? 'white' : 'black',
        fontWeight: item.size === size ? 700 : 400,
        mr: 1,
        mb: 1,
        fontSize: [12, 16],
        border: '.0625rem solid black',
        textTransform: 'uppercase',
      }}
      onClick={() => setItemSize(item.id, size)}
    >
      {size}
    </Button>
  ))

  const renderedDirections = directions?.map((direction) => (
    <Button
      key={direction}
      w={6}
      h={6}
      colorScheme="blackAlpha"
      rounded="none"
      aria-label={direction}
      onClick={() => switchView(productViews, direction)}
    >
      {direction === 'forward' ? '>' : '<'}
    </Button>
  ))

  return (
    <>
      <hr />
      <Flex
        justifyContent="space-between"
        py={4}
        flexDir={['column', 'row']}
        gap={[4, 2]}
      >
        <Box>
          <Text
            fontSize={[30]}
            lineHeight={['2.3125rem']}
            fontWeight={600}
            my={3}
            maxWidth={600}
          >
            {item.title}
          </Text>
          <Text
            fontSize={[30]}
            lineHeight={['1.6875rem']}
            fontWeight={400}
            my={3}
            textTransform="capitalize"
          >
            {item.category}{' '}
          </Text>
          <Text fontSize={[24]} lineHeight={['1.5rem']} fontWeight={700} my={4}>
            {formatCurrency(+item.price, selectedCurrency)}
          </Text>
          <Text
            fontSize={[18]}
            lineHeight={['1.125rem']}
            fontWeight={700}
            my={3}
            textTransform="uppercase"
          >
            size:
          </Text>
          <Box>{renderedSizes}</Box>
        </Box>
        <Flex gap={4}>
          <Flex flexDir="column" justifyContent="space-between">
            <Button
              sx={{ ...styles.btn }}
              onClick={() => updateItemQuantity(item.id, 'increase')}
            >
              +
            </Button>
            <Text fontSize={24} fontWeight={500} data-testid="quantity">
              {item.quantity}
            </Text>
            <Button
              sx={{ ...styles.btn }}
              onClick={() => updateItemQuantity(item.id, 'decrease')}
            >
              -
            </Button>
          </Flex>
          <Box position="relative">
            <Image
              src={item.image}
              w="12.5rem"
              h="18rem"
              objectFit="cover"
              objectPosition={selectedView}
            />
            <Flex
              justifyContent="end"
              position="absolute"
              bottom={'1rem'}
              right="1rem"
              gap={2}
            >
              {renderedDirections}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CartItem
