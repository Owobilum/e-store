import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './features/product/Products'
import Layout from './common/components/Layout'
import Product from './features/product/Product'
import Cart from './features/cart/Cart'

function App(): ReactElement {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:productName/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Layout>
  )
}

export default App
