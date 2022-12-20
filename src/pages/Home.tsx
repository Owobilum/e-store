import { Button, useColorMode } from '@chakra-ui/react'
import { FC } from 'react'

const Home: FC = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <div>
      <Button
        onClick={() => toggleColorMode()}
        position="fixed"
        bottom="10"
        right={'1.5'}
      >
        Toogle Color Mode
      </Button>
    </div>
  )
}

export default Home
