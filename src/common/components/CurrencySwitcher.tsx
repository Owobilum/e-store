import { FC, useState } from 'react'
import { Box, IconButton, Stack, Text } from '@chakra-ui/react'

import { CurrencyType } from '../../types'
import useCurrency from '../hooks/useCurrency'
import { EuroIcon } from './icons/EuroIcon'
import { DollarIcon } from './icons/DollarIcon'
import { UpIcon } from './icons/UpIcon'
import { DownIcon } from './icons/DownIcon'

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

export default CurrencySwitcher
