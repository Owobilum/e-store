import { Icon } from '@chakra-ui/react'
import { FC } from 'react'
import { IconProps } from '../../../types'

const DownIcon: FC<IconProps> = (props) => (
  <Icon viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1 0.5L4 3.5L7 0.5"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

export { DownIcon }
