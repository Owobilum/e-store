import {
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'
import { AppDispatch } from '../../app/store'
import { useDispatch } from 'react-redux'
import { SizeType } from '../../types'
import { FC } from 'react'
import { CartItemType } from '../../types'
import { setSize, updateQuantity } from './cartSlice'
import useCurrency from '../../common/hooks/useCurrency'
import { formatCurrency } from '../../common/utils'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const CartPopoverItem: FC<{ item: CartItemType }> = ({
  item: { id, quantity, image, title, price, size },
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedCurrency } = useCurrency()

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
          <Text>
            {sizes?.map((itemSize) => (
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
                onClick={() => dispatch(setSize({ id, size: itemSize }))}
              >
                {itemSize}
              </Button>
            ))}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Flex flexDirection="column" justifyContent="space-between" h="100%">
          <Button
            display="block"
            backgroundColor="white"
            rounded="none"
            border=".0625rem solid black"
            onClick={() => dispatch(updateQuantity({ id, type: 'increase' }))}
          >
            +
          </Button>
          <Box textAlign="center">{quantity}</Box>
          <Button
            display="block"
            backgroundColor="white"
            rounded="none"
            border=".0625rem solid black"
            onClick={() => dispatch(updateQuantity({ id, type: 'decrease' }))}
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
