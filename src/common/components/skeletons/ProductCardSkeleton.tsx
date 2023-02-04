import { FC } from 'react'
import { Stack, Skeleton } from '@chakra-ui/react'

const ProductCardSkeleton: FC = () => {
  return (
    <Stack w={['100%', '100%', '20.3125rem', '25rem']}>
      <Skeleton height="12.5rem" />
      <Skeleton height="1.25rem" />
      <Skeleton width="40%" height="0.75rem" />
    </Stack>
  )
}

export default ProductCardSkeleton
