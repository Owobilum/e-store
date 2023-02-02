import { useState, FC } from 'react'
import { Flex, Box, Text, Button, Image } from '@chakra-ui/react'
import { CartItemType, SizeType, ViewType } from '../../types'
import useCurrency from '../../common/hooks/useCurrency'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { setSize, updateQuantity } from './cartSlice'
import { formatCurrency } from '../../common/utils'

const productViews: { angle: ViewType }[] = [
  { angle: 'top right' },
  { angle: 'top left' },
  { angle: 'bottom right' },
]

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const CartItem: FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedCurrency } = useCurrency()
  const [selectedView, setSelectedView] = useState<ViewType>('top right')

  const switchView = (direction: 'forward' | 'backward') => {
    const index = productViews.findIndex(({ angle }) => angle === selectedView)
    if (direction === 'forward' && productViews.length > index + 1) {
      setSelectedView(productViews[index + 1].angle)
    } else if (direction === 'backward' && index > 0) {
      setSelectedView(productViews[index - 1].angle)
    }
  }

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
            lineHeight={['37px']}
            fontWeight={600}
            my={3}
            maxWidth={600}
          >
            {item.title}
          </Text>
          <Text
            fontSize={[30]}
            lineHeight={['27px']}
            fontWeight={400}
            my={3}
            textTransform="capitalize"
          >
            {item.category}{' '}
          </Text>
          <Text fontSize={[24]} lineHeight={['24px']} fontWeight={700} my={4}>
            {formatCurrency(+item.price, selectedCurrency)}
          </Text>
          <Text
            fontSize={[18]}
            lineHeight={['18px']}
            fontWeight={700}
            my={3}
            textTransform="uppercase"
          >
            size:
          </Text>
          <Box>
            {sizes?.map((size) => (
              <Button
                key={size}
                sx={{
                  background: item.size === size ? 'black' : 'white',
                  rounded: 'none',
                  h: ['45px'],
                  w: ['63px'],
                  color: item.size === size ? 'white' : 'black',
                  mr: 1,
                  mb: 1,
                  fontSize: [12, 16],
                  border: '1px solid black',
                  textTransform: 'uppercase',
                }}
                onClick={() => dispatch(setSize({ id: item.id, size }))}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>
        <Flex gap={4}>
          <Flex flexDir="column" justifyContent="space-between">
            <Button
              border="1px solid black"
              rounded="none"
              colorScheme="whiteAlpha"
              color="black"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, type: 'increase' }))
              }
            >
              +
            </Button>
            <Text fontSize={24} fontWeight={500}>
              {item.quantity}
            </Text>
            <Button
              border="1px solid black"
              rounded="none"
              colorScheme="whiteAlpha"
              color="black"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, type: 'decrease' }))
              }
            >
              {' '}
              -
            </Button>
          </Flex>
          <Box position="relative">
            <Image
              src={item.image}
              w="200px"
              h="288px"
              objectFit="cover"
              objectPosition={selectedView}
            />
            <Flex
              justifyContent="end"
              position="absolute"
              bottom={'16px'}
              right="16px"
              gap={2}
            >
              {' '}
              <Button
                w={6}
                h={6}
                colorScheme="blackAlpha"
                rounded="none"
                aria-label="previous"
                onClick={() => switchView('backward')}
              >
                {'<'}
              </Button>{' '}
              <Button
                w={6}
                h={6}
                colorScheme="blackAlpha"
                rounded="none"
                aria-label="next"
                onClick={() => switchView('forward')}
              >
                {'>'}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CartItem
