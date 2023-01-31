import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { DOLLAR_EURO_RATE } from '../constants'

const useProduct = () => {
  const { products, currency, currentCategory } = useSelector(
    (state: RootState) => state.product
  )

  const newProducts = useMemo(() => {
    let newProd = products
    if (currency === 'eur') {
      newProd = products.map((product) => ({
        ...product,
        price: String((Number(product.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }))
    }
    return newProd
  }, [currency, products])

  return { products: newProducts, currentCategory }
}

export default useProduct
