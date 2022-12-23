import { ReactElement } from 'react'
import { Counter } from './features/counter/Counter'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './features/product/Products'
import Layout from './common/components/Layout'

function App(): ReactElement {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="counter" element={<Counter />} />
      </Routes>
    </Layout>
  )
}

export default App
