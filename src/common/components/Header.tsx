import { Box, Flex, Heading, useTheme, Stack } from '@chakra-ui/react'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { CurrencyType, ProductCategoryType } from '../../types'
import useCart from '../hooks/useCart'
import Badge from './badge/Badge'
import { BagIcon } from './icons/BagIcon'
import CartPopover from '../../features/cart/CartPopover'
import CurrencySwitcher from './currency_switcher/CurrencySwitcher'
import useProduct from '../hooks/useProduct'

const currencies: { name: CurrencyType; symbol: string }[] = [
  { name: 'usd', symbol: '$' },
  { name: 'eur', symbol: '€' },
]

const Header: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { numberOfItemsInCart, isCartPopoverActive, toggleCartPopover } =
    useCart()
  const { setProductCategory, currentCategory: currentTab } = useProduct()

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
    setProductCategory(category)
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
              handleClick={toggleCartPopover}
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
