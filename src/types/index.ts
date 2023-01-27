export type ProductCategoryType =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing"

export type ProductType = {
  id: number
  title: string
  price: string
  category: ProductCategoryType
  description: string
  image: string
}

export interface CartItemType extends ProductType {
  quantity: number
}

export interface IconProps {
  fontSize: number
  fill: string
  sx?: object
}

export type CurrencyType = 'usd' | 'eur' | 'jpy' | 'ngn'
