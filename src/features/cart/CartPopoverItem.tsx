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
import { useState, FC } from 'react'
import { CartItemType } from '../../types'
import { addToCart, removeFromCart } from './cartSlice'
import useCurrency from '../../common/hooks/useCurrency'
import { renderCurrencyIcon } from '../../common/components/CurrencySwitcher'

const sizes: SizeType[] = ['xs', 's', 'm', 'l']

const CartPopoverItem: FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedSize, setSelectedSize] = useState<SizeType>('m')
  const { selectedCurrency } = useCurrency()

  return (
    <Grid h="190px" templateColumns="repeat(6, 1fr)" gap={2} mb={8}>
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
          {item.title}
        </Text>
        <Text>
          {renderCurrencyIcon(selectedCurrency, 16)}
          {item.price}
        </Text>
        <Box>
          <Text>Size:</Text>
          <Text>
            {sizes?.map((size) => (
              <Button
                key={size}
                sx={{
                  background: selectedSize === size ? 'black' : 'white',
                  rounded: 'none',
                  h: 5,
                  w: 5,
                  color: selectedSize === size ? 'white' : 'black',
                  mr: 1,
                  mb: 1,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  border: '1px solid black',
                }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
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
            border="1px solid black"
            onClick={() => dispatch(addToCart(item))}
          >
            +
          </Button>
          <Box textAlign="center">{item.quantity}</Box>
          <Button
            display="block"
            backgroundColor="white"
            rounded="none"
            border="1px solid black"
            onClick={() => dispatch(removeFromCart(item))}
          >
            -
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Image
          w="121px"
          h="100%"
          src={item.image}
          objectFit={'cover'}
          objectPosition="center"
        />
      </GridItem>
    </Grid>
  )
}

export default CartPopoverItem
