import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { DOLLAR_EURO_RATE } from '../constants'

const useProduct = () => {
  const { products, currency, currentCategory, product, status, error } =
    useSelector((state: RootState) => state.product)

  const newProducts = useMemo(() => {
    if (!products) return null
    let newProd = products
    if (currency === 'eur') {
      newProd = products.map((product) => ({
        ...product,
        price: String((Number(product.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }))
    }
    return newProd
  }, [currency, products])

  const newProduct = useMemo(() => {
    if (!product) return null
    let newProd = product
    if (currency === 'eur') {
      newProd = {
        ...product,
        price: String((Number(product.price) * DOLLAR_EURO_RATE).toFixed(2)),
      }
    }
    return newProd
  }, [currency, product])

  return {
    products: newProducts,
    currentCategory,
    product: newProduct,
    status,
    error,
  }
}

export default useProduct
