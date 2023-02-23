import type { FC } from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'

import { SizeType } from '../../types'
import { CartItemType } from '../../types'
import useCurrency from '../../common/hooks/useCurrency'
import { formatCurrency } from '../../common/utils'
import useCart from '../../common/hooks/useCart'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const CartPopoverItem: FC<{ item: CartItemType }> = (props) => {
  const {
    item: { id, quantity, image, title, price, size },
  } = props
  const { selectedCurrency } = useCurrency()
  const { setItemSize, updateItemQuantity } = useCart()

  const rendered = sizes?.map((itemSize) => (
    <Button
      key={itemSize}
      sx={{
        background: size === itemSize ? 'black' : 'white',
        rounded: 'none',
        h: 5,
        w: 5,
        color: size === itemSize ? 'white' : 'black',
        mr: 1,
        mb: 1,
        fontSize: 12,
        textTransform: 'uppercase',
        border: '.0625rem solid black',
      }}
      onClick={() => setItemSize(id, itemSize)}
    >
      {itemSize}
    </Button>
  ))

  return (
    <Grid h="11.875rem" templateColumns="repeat(6, 1fr)" gap={2} mb={8}>
      <GridItem
        colSpan={3}
        sx={{
          p: 0,
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Text
          sx={{
            fontSize: 14,
            fontWeight: 400,
            width: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {title}
        </Text>
        <Text>{formatCurrency(Number(price), selectedCurrency)}</Text>
        <Box>
          <Text>Size:</Text>
          <Text>{rendered}</Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Flex flexDirection="column" justifyContent="space-between" h="100%">
          <Button
            display="block"
            backgroundColor="white"
            rounded="none"
            border=".0625rem solid black"
            onClick={() => updateItemQuantity(id, 'increase')}
          >
            +
          </Button>
          <Box textAlign="center">{quantity}</Box>
          <Button
            display="block"
            backgroundColor="white"
            rounded="none"
            border=".0625rem solid black"
            onClick={() => updateItemQuantity(id, 'decrease')}
          >
            -
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Image
          w="7.5625rem"
          h="100%"
          src={image}
          objectFit={'cover'}
          objectPosition="center"
        />
      </GridItem>
    </Grid>
  )
}

export default CartPopoverItem
