import type { CurrencyType } from '../../types'
import { setCurrrency } from '../../features/product/productSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const useCurrency = () => {
  const dispatch = useAppDispatch()
  const selectedCurrency = useAppSelector((state) => state.product.currency)

  const handleCurrencySwitch = (currency: CurrencyType) =>
    dispatch(setCurrrency(currency))

  return {
    selectedCurrency,
    handleCurrencySwitch,
  }
}

export default useCurrency
