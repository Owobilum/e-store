import { Box, Flex, useTheme, Stack, Button } from '@chakra-ui/react'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { CurrencyType, ProductCategoryType } from '../../../types'
import useCart from '../../hooks/useCart'
import Badge from '../badge/Badge'
import { BagIcon } from '../icons/BagIcon'
import CurrencySwitcher from '../currency_switcher/CurrencySwitcher'
import useProduct from '../../hooks/useProduct'

const currencies: { name: CurrencyType; symbol: string }[] = [
  { name: 'usd', symbol: '$' },
  { name: 'eur', symbol: '€' },
]

const tabs: { value: ProductCategoryType; name: string }[] = [
  { value: "women's clothing", name: 'women' },
  { value: "men's clothing", name: 'men' },
]

const styles = {
  headerContainer: {
    height: 100,
    width: '100%',
    py: 4,
    justifyContent: 'space-between',
  },
  headTab: {
    fontSize: [16],
    fontWeight: 600,
    background: 'transparent',
    rounded: 'none',
    textTransform: 'capitalize',
  },
}

const Header: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { numberOfItemsInCart, toggleCartPopover } = useCart()
  const { setProductCategory, currentCategory: currentTab } = useProduct()

  const handleTabChange = (category: ProductCategoryType) => {
    if (pathname !== '/') navigate('/')
    setProductCategory(category)
  }

  const renderedTabs = tabs.map(({ value, name }) => (
    <Button
      key={value}
      sx={{
        ...styles.headTab,
        borderBottom: `${
          currentTab === value
            ? `.125rem solid ${theme.colors.primary.main}`
            : 0
        }`,
      }}
      onClick={() => handleTabChange(value)}
    >
      {name}
    </Button>
  ))

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex sx={styles.headerContainer}>
        <Flex gap={[2, 5]} alignItems="center" as="nav">
          {renderedTabs}
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
    </Box>
  )
}

export default Header
