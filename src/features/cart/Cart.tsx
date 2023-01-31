import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react'
import { FC, ReactElement, useState } from 'react'
import { SizeType, ViewType } from '../../types'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const productViews: { angle: ViewType }[] = [
  { angle: 'top right' },
  { angle: 'top left' },
  { angle: 'bottom right' },
]

const CartItem: FC = () => {
  const [selectedSize, setSelectedSize] = useState<SizeType>('m')
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
      <Flex justifyContent="space-between" py={4}>
        <Box>
          <Text fontSize={[30]} lineHeight={['27px']} fontWeight={600} my={3}>
            Apollo
          </Text>
          <Text fontSize={[30]} lineHeight={['27px']} fontWeight={400} my={3}>
            Running Shorts
          </Text>
          <Text fontSize={[24]} lineHeight={['24px']} fontWeight={700} my={3}>
            $50.00
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
          </Box>
        </Box>
        <Flex gap={4}>
          <Flex flexDir="column" justifyContent="space-between">
            <Button
              border="1px solid black"
              rounded="none"
              colorScheme="whiteAlpha"
              color="black"
            >
              +
            </Button>
            <Text fontSize={24} fontWeight={500}>
              1
            </Text>
            <Button
              border="1px solid black"
              rounded="none"
              colorScheme="whiteAlpha"
              color="black"
            >
              {' '}
              -
            </Button>
          </Flex>
          <Box position="relative">
            <Image
              src="/logo512.png"
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

function CartPage(): ReactElement {
  return (
    <Box pb={'20%'}>
      <Heading textTransform="uppercase" mb={8}>
        {' '}
        Cart
      </Heading>

      <CartItem />
      <CartItem />
      <CartItem />

      <hr />
      <Text fontSize={24} pt={8}>
        Tax 21%: <Text as="b">$42.00</Text>
      </Text>
      <Text fontSize={24}>
        Quantity: <Text as="b">3</Text>{' '}
      </Text>
      <Text fontSize={24}>
        Total: <Text as="b">$200.00</Text>
      </Text>
      <Button
        colorScheme="primary"
        textTransform="uppercase"
        rounded="none"
        w={['100%', '279px']}
        h="43px"
        my={4}
      >
        order
      </Button>
    </Box>
  )
}

export default CartPage
