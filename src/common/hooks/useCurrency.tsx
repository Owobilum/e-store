import type { AppDispatch, RootState } from '../../app/store'
import { useDispatch, useSelector } from 'react-redux'

import type { CurrencyType } from '../../types'
import { setCurrrency } from '../../features/product/productSlice'

const useCurrency = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedCurrency = useSelector(
    (state: RootState) => state.product.currency
  )

  const handleCurrencySwitch = (currency: CurrencyType) =>
    dispatch(setCurrrency(currency))

  return {
    selectedCurrency,
    handleCurrencySwitch,
  }
}

export default useCurrency
