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
  size: SizeType
}

export interface IconProps {
  fontSize: number
  fill: string
  sx?: object
}

export type CurrencyType = 'usd' | 'eur' | 'jpy' | 'ngn'

export type SizeType = 'xs' | 's' | 'm' | 'l'

export type ViewType =
  | 'top right'
  | 'top left'
  | 'bottom right'
  | 'bottom left'
  | 'center'

export type ProductViewType = { angle: ViewType }[]
