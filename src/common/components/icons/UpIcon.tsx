import { Icon } from '@chakra-ui/react'
import { FC } from 'react'
import { IconProps } from '../../../types'

const UpIcon: FC<IconProps> = (props) => (
  <Icon viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg>
      <path
        d="M1 3.5L4 0.5L7 3.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
)

export { UpIcon }
