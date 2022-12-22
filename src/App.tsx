import { ReactElement } from 'react'
import { Counter } from './features/counter/Counter'
import { Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import Home from './pages/Home'
import Header from './common/components/Header'
import Products from './features/product/Products'

function App(): ReactElement {
  return (
    <Container maxW="container.xl">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="counter" element={<Counter />} />
      </Routes>
    </Container>
  )
}

export default App
