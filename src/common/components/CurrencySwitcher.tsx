import { FC, useState } from 'react'
import { Box, IconButton, Stack, Text } from '@chakra-ui/react'

import { CurrencyType } from '../../types'
import useCurrency from '../hooks/useCurrency'
import { EuroIcon } from './icons/EuroIcon'
import { DollarIcon } from './icons/DollarIcon'
import { UpIcon } from './icons/UpIcon'
import { DownIcon } from './icons/DownIcon'

export const renderCurrencyIcon = (
  selectedCurrency: CurrencyType,
  fontSize: number,
  fill: string = '1D1F22'
) => {
  switch (selectedCurrency) {
    case 'eur':
      return <EuroIcon fontSize={fontSize} fill={fill} />

    case 'usd':
      return <DollarIcon fontSize={fontSize} fill={fill} />

    default:
      return <span />
  }
}

const CurrencySwitcher: FC<{
  currencies: { name: CurrencyType; symbol: string }[]
}> = ({ currencies }) => {
  const { selectedCurrency, handleCurrencySwitch } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box display="inline-block">
      <Box position="relative">
        {renderCurrencyIcon(selectedCurrency, 18)}
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
          sx={{
            position: 'absolute',
            zIndex: 5,
            width: 24,
            bottom: `-${(currencies.length * 50) / 16}rem`,
            py: 2,
            boxShadow:
              '0 .25rem .5rem 0 rgba(0, 0, 0, 0.2), 0 .375rem 1.25rem 0 rgba(0, 0, 0, 0.19)',
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
