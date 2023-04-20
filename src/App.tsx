import { ReactElement, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ErrorBoundary from './common/components/error_boundary/ErrorBoundary'
import Layout from './common/components/layout/Layout'
import Loader from './common/components/loader/Loader'
import Missing from './common/components/missing/Missing'

const HomeRoute = lazy(() => import('../src/features/product/Products'))
const ProductRoute = lazy(() => import('../src/features/product/Product'))
const CartRoute = lazy(() => import('../src/features/cart/Cart'))

function App(): ReactElement {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/:productName/:productId" element={<ProductRoute />} />
            <Route path="cart" element={<CartRoute />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Layout>
  )
}

export default App
