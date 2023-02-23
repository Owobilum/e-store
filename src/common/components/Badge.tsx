import { Box } from '@chakra-ui/react'
import type { FC } from 'react'
import { IconProps } from '../../types'
import { CartIcon } from './icons/CartIcon'

interface Props extends IconProps {
  handleClick?: () => void
  items?: number
}

const Badge: FC<Props> = (props) => {
  const { handleClick, items, fontSize, fill } = props
  const handleCart = () => handleClick && handleClick()

  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      {items ? (
        <Box
          sx={{
            display: 'inline-block',
            height: fontSize / 5,
            width: fontSize / 5,
            backgroundColor: fill,
            fontSize: fontSize / 2,
            borderRadius: '9999px',
            textAlign: 'center',
            position: 'absolute',
            top: -1,
            right: -1,
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={handleCart}
        >
          {items}
        </Box>
      ) : (
        ''
      )}
      <CartIcon fontSize={fontSize} fill={fill} />
    </Box>
  )
}

export default Badge
