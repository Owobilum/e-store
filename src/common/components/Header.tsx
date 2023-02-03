import { Box, Flex, Heading, useTheme, Stack } from '@chakra-ui/react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { setCategory } from '../../features/product/productSlice'
import type { CurrencyType, ProductCategoryType } from '../../types'
import { toggleIsCartPopoverActive } from '../../features/cart/cartSlice'
import useCart from '../hooks/useCart'
import Badge from './Badge'
import { BagIcon } from './icons/BagIcon'
import CartPopover from '../../features/cart/CartPopover'
import CurrencySwitcher from './CurrencySwitcher'
import { useLocation, useNavigate } from 'react-router-dom'

const currencies: { name: CurrencyType; symbol: string }[] = [
  { name: 'usd', symbol: '$' },
  { name: 'eur', symbol: '€' },
]

const Header: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
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
      py: 4,
    },
    headTab: {
      fontSize: [16],
      pb: [4, 6],
      fontWeight: 600,
    },
    activeHeadTab: {
      fontSize: [16],
      pb: [4, 6],
      fontWeight: 600,
      borderBottom: `solid ${theme.colors.primary.main}`,
    },
  }

  const handleTabChange = (category: ProductCategoryType) => {
    if (pathname !== '/') navigate('/')
    dispatch(setCategory(category))
  }

  const handleCart = () => {
    dispatch(toggleIsCartPopoverActive())
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
