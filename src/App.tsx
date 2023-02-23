import { ReactElement, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './common/components/Layout'
import Loader from './common/components/Loader'

const HomeRoute = lazy(() => import('../src/features/product/Products'))
const ProductRoute = lazy(() => import('../src/features/product/Product'))
const CartRoute = lazy(() => import('../src/features/cart/Cart'))

function App(): ReactElement {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/:productName/:productId" element={<ProductRoute />} />
          <Route path="cart" element={<CartRoute />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
