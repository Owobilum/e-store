import {
  Box,
  Flex,
  Heading,
  useTheme,
  Grid,
  GridItem,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { setCategory } from '../../features/product/productSlice'
import type { CartItemType, ProductCategoryType } from '../../types'
import {
  setIsCartPopoverActive,
  addToCart,
  removeFromCart,
} from '../../features/cart/cartSlice'
import useCart from '../hooks/useCart'
import CartIcon from './icons/CartIcon'
import DownIcon from './icons/DownIcon'
import DollarIcon from './icons/DollarIcon'
import BagIcon from './icons/BagIcon'

type SizeType = 'xs' | 's' | 'm' | 'l'

const CartItem: FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedSize, setSelectedSize] = useState<SizeType>('m')

  const sizes: SizeType[] = ['xs', 's', 'm', 'l']
  return (
    <Grid
      maxH="150px"
      minH="150px"
      // templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={2}
      mb={8}
      sx={{ overflow: 'hidden' }}
    >
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
        <Text>${item.price}</Text>
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
                }}
                onClick={() => setSelectedSize(size)}
                fontWeight="light"
              >
                {size}
              </Button>
            ))}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1} sx={{ maxHeight: '100%' }}>
        <Flex flexDirection="column" justifyContent="space-between" h="90%">
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
      <GridItem colSpan={2} sx={{ maxHeight: '100%' }}>
        <Image
          h="100%"
          src={item.image}
          objectFit={'cover'}
          objectPosition="center"
          maxHeight={'100%'}
        />
      </GridItem>
    </Grid>
  )
}

const CartPopover: FC = () => {
  const { cart, numberOfItemsInCart, totalAmount } = useCart()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        right: 0,
        height: 20,
        zIndex: 5,
        w: '325px',
        overflowY: 'auto',
        p: 2,
        h: ['400px', '677px'],
        bg: 'white',
      }}
    >
      <Heading fontSize={[14, 18]} sx={{ py: 4 }}>
        My Bag, {numberOfItemsInCart} items
      </Heading>
      {cart?.length
        ? cart.map((item) => <CartItem key={item.id} item={item} />)
        : 'No items in cart'}

      <Flex justifyContent="space-between" my={2}>
        <Text>Total:</Text> <Text>${totalAmount}</Text>
      </Flex>
      <Flex justifyContent="space-between" my={2}>
        <Button variant="outline" colorScheme="blackAlpha" rounded="none">
          View Bag
        </Button>
        <Button variant="solid" colorScheme="primary" rounded="none">
          Checkout
        </Button>
      </Flex>
    </Box>
  )
}

const Header: FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const currentTab = useSelector(
    (state: RootState) => state.product.currentCategory
  )
  const isCartPopoverActive = useSelector(
    (state: RootState) => state.cart.isCartPopoverActive
  )
  const { numberOfItemsInCart } = useCart()

  const styles = {
    headerContainer: {
      height: 100,
      width: '100%',
      p: 4,
    },
    headTab: {
      fontSize: [16], //[] this is for responsive styles
      pb: [4, 6],
      fontWeight: 600,
      // _hover: { //this is for pseudo states
      //   fontSize: 32,
      // },
    },
    activeHeadTab: {
      fontSize: [16],
      pb: [4, 6],
      fontWeight: 600,
      borderBottom: `solid ${theme.colors.primary.main}`,
    },
  }

  const handleTabChange = (category: ProductCategoryType) => {
    dispatch(setCategory(category))
  }

  const handleCart = () => {
    dispatch(setIsCartPopoverActive())
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex sx={styles.headerContainer} justify="space-between">
        <Flex gap={[2, 5]} alignItems="center">
          <Heading
            sx={
              currentTab !== "women's clothing"
                ? styles.headTab
                : styles.activeHeadTab
            }
            role="button"
            onClick={() => handleTabChange("women's clothing")}
          >
            Women
          </Heading>
          <Heading
            sx={
              currentTab !== "men's clothing"
                ? styles.headTab
                : styles.activeHeadTab
            }
            onClick={() => handleTabChange("men's clothing")}
            role="button"
          >
            Men
          </Heading>
          <Heading
            sx={
              currentTab !== 'electronics'
                ? styles.headTab
                : styles.activeHeadTab
            }
            onClick={() => handleTabChange('electronics')}
            role="button"
          >
            Kids
          </Heading>
        </Flex>
        <Box>
          <BagIcon />
        </Box>
        <Box>
          <DollarIcon />
          <DownIcon />
          <CartIcon handleCart={handleCart} items={numberOfItemsInCart} />
        </Box>
      </Flex>
      {isCartPopoverActive && <CartPopover />}
    </Box>
  )
}

export default Header
