import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { SizeType, ViewType } from '../../types'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const productViews: { angle: ViewType }[] = [
  { angle: 'top right' },
  { angle: 'top left' },
  { angle: 'bottom right' },
]

const Product: FC = () => {
  const [selectedSize, setSelectedSize] = useState<SizeType>('m')
  const [selectedView, setSelectedView] = useState<ViewType>('top left')

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={[4, 8]}>
      <GridItem colSpan={[12, 2]}>
        <Flex direction={['row', 'column']} gap={4}>
          {productViews.map(({ angle }, i) => (
            <Image
              key={i}
              src="/logo512.png"
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
          src="/logo512.png"
          height={[400, 560]}
          width="100%"
          objectFit="cover"
          objectPosition={selectedView}
        />
      </GridItem>
      <GridItem colSpan={[12, 4]}>
        <Text fontSize={[20, 30]} lineHeight={[5, 7]} fontWeight={600} mb={4}>
          Apollo
        </Text>
        <Text fontSize={[20, 30]} lineHeight={[5, 7]} fontWeight={400}>
          Running Short
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
                fontWeight="light"
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
          $50.00
        </Text>

        <Button
          colorScheme={'primary'}
          w={['100%']}
          h={['52px']}
          rounded="none"
          textTransform="uppercase"
          my={8}
        >
          add to cart
        </Button>

        <Text my={4}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
          delectus consectetur culpa, aut dolorum, labore impedit autem numquam
          dolor cumque vitae iure. Omnis minus eum neque consectetur porro
          officia doloremque!
        </Text>
      </GridItem>
    </Grid>
  )
}

export default Product
