export type ProductCategoryType = "men's clothing" | "women's clothing"

export interface IProduct {
  id: number
  title: string
  price: string
  category: ProductCategoryType
  description: string
  image: string
}

export interface ICartItem extends IProduct {
  quantity: number
  size: SizeType
}

export interface IconProps {
  fontSize: number
  fill: string
  sx?: object
}

export type SizeType = 'xs' | 's' | 'm' | 'l'
