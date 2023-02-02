import { CurrencyType } from '../../types'

export const formatCurrency = (amount: number, currency: CurrencyType) => {
  let locale = currency === 'eur' ? 'en-DE' : 'en-US'
  let code = currency === 'eur' ? 'EUR' : 'USD'
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
  }).format(amount)
}
