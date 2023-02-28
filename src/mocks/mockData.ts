import type { IProduct } from '../types'

export const mockProducts: IProduct[] = [
  {
    id: 1,
    category: "women's clothing",
    description: '1 Stylist plain red blazer',
    image: 'https://product.com/1',
    price: '100',
    title: '1 Blazer',
  },
  {
    id: 2,
    category: "women's clothing",
    description: '2 Stylist plain blue blazer',
    image: 'https://product.com/2',
    price: '200',
    title: '2 Blazer',
  },
]

export const mockProduct: IProduct = {
  id: 2,
  category: "women's clothing",
  description: '2 Stylist plain blue blazer',
  image: 'https://product.com/2',
  price: '200',
  title: '2 Blazer',
}
