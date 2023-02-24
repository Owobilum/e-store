import { SimpleGrid, Spinner, useTheme } from '@chakra-ui/react'

const Loader = () => {
  const theme = useTheme()
  return (
    <SimpleGrid placeItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={theme.colors.primary.main}
        size="xl"
      />
    </SimpleGrid>
  )
}

export default Loader
