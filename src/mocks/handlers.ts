import { rest } from 'msw'
import { mockProduct, mockProducts } from './mockData'

export const handlers = [
  rest.get(
    'https://fakestoreapi.com/products/category/:categoryName',
    (req, res, ctx) => {
      return res(ctx.json(mockProducts))
    }
  ),
  rest.get('https://fakestoreapi.com/products/:productId', (req, res, ctx) => {
    return res(ctx.json(mockProduct))
  }),
]
