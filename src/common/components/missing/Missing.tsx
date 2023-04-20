import { Box, Heading, Text, useTheme } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Missing: FC = () => {
  const theme = useTheme()

  return (
    <Box as="article" sx={{ padding: '6.25rem' }}>
      <Heading sx={{ py: 8 }}>Oops!</Heading>
      <Text>Page Not Found</Text>
      <Box sx={{ py: 4 }}>
        <Link
          to="/"
          style={{ color: theme.colors.primary.main, fontWeight: 700 }}
        >
          Go to Homepage
        </Link>
      </Box>
    </Box>
  )
}

export default Missing
