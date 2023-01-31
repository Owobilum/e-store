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
  IconButton,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { setCategory } from '../../features/product/productSlice'
import type {
  CartItemType,
  CurrencyType,
  ProductCategoryType,
  SizeType,
} from '../../types'
import {
  setIsCartPopoverActive,
  addToCart,
  removeFromCart,
} from '../../features/cart/cartSlice'
import useCart from '../hooks/useCart'
import Badge from './Badge'
import { DownIcon } from './icons/DownIcon'
import { DollarIcon } from './icons/DollarIcon'
import { BagIcon } from './icons/BagIcon'
import { EuroIcon } from './icons/EuroIcon'
import { UpIcon } from './icons/UpIcon'
import useCurrency from '../hooks/useCurrency'

const CartItem: FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedSize, setSelectedSize] = useState<SizeType>('m')

  const sizes: SizeType[] = ['xs', 's', 'm', 'l']

  return (
    <Grid
      maxH="150px"
      minH="150px"
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

const currencies: { name: CurrencyType; symbol: string }[] = [
  { name: 'usd', symbol: '$' },
  { name: 'eur', symbol: '€' },
]

const CurrencySwitcher: FC<{
  currencies: { name: CurrencyType; symbol: string }[]
}> = ({ currencies }) => {
  const { selectedCurrency, handleCurrencySwitch } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const renderIcon = () => {
    switch (selectedCurrency) {
      case 'eur':
        return <EuroIcon fontSize={18} fill="#1D1F22" />

      case 'usd':
        return <DollarIcon fontSize={18} fill="#1D1F22" />

      default:
        return <span />
    }
  }

  return (
    <Box display="inline-block">
      <Box position="relative">
        {renderIcon()}
        <IconButton
          aria-label="toggle currency dropdown"
          icon={
            isOpen ? (
              <UpIcon fontSize={8} fill="black" />
            ) : (
              <DownIcon fontSize={8} fill="black" />
            )
          }
          size="sm"
          colorScheme={'whiteAlpha'}
          mr={2}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <Stack
          position="absolute"
          sx={{
            width: 24,
            bottom: `-${currencies.length * 50}px`,
            py: 2,
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            display: isOpen ? 'flex' : 'none',
          }}
        >
          {currencies?.map(({ name, symbol }, index) => (
            <Text
              key={index}
              sx={{
                _hover: {
                  backgroundColor: 'gray.200',
                },
                cursor: 'pointer',
                py: 1,
                px: 1,
                textAlign: 'center',
              }}
              onClick={() => {
                handleCurrencySwitch(name)
                setIsOpen(false)
              }}
            >
              {symbol}{' '}
              <Text as="span" textTransform="uppercase">
                {name}
              </Text>
            </Text>
          ))}
        </Stack>
      </Box>
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
          <BagIcon
            fontSize={30}
            fill="url(#paint0_linear_150_362)"
            sx={{ cursor: 'pointer' }}
          />
        </Box>
        <Stack>
          <Box>
            <CurrencySwitcher currencies={currencies} />
            <Badge
              handleClick={handleCart}
              items={numberOfItemsInCart}
              fill="#43464E"
              fontSize={20}
            />
          </Box>
        </Stack>
      </Flex>
      {isCartPopoverActive && <CartPopover />}
    </Box>
  )
}

export default Header
