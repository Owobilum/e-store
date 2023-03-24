import { rest } from 'msw'
import { mockProduct, mockProducts } from './mockData'

const baseUrl = 'https://fakestoreapi.com'

export const handlers = [
  rest.get(`${baseUrl}/products/category/:categoryName`, (req, res, ctx) => {
    return res(ctx.json(mockProducts))
  }),
  rest.get(`${baseUrl}/products/:productId`, (req, res, ctx) => {
    return res(ctx.json(mockProduct))
  }),
  rest.post(`${baseUrl}/carts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
]
