import { FC } from 'react'
import { Grid, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react'

const ProductSkeleton: FC = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={[4, 8]}>
      <GridItem colSpan={[12, 2]}>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="6" />{' '}
      </GridItem>
      <GridItem colSpan={[12, 6]}>
        <Skeleton height="25rem" width="100%" />
      </GridItem>
      <GridItem colSpan={[12, 4]}>
        <SkeletonText mt="4" noOfLines={10} spacing="4" skeletonHeight="3" />{' '}
      </GridItem>
    </Grid>
  )
}

export default ProductSkeleton
