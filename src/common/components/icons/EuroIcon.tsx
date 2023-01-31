import { Icon } from '@chakra-ui/react'
import { FC } from 'react'
import { IconProps } from '../../../types'

const EuroIcon: FC<IconProps> = (props) => (
  <Icon
    viewBox="0 0 11 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    aria-label="euro sign"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -60 117.75 120">
      <path d="M-70.843013-15H31.177404l-4.156987 10H-75zm0 20H22.863429l-4.156987 10H-75zM38.302222-32.13938a50 50 0 1 0 0 64.278761v14.04438a60 60 0 1 1 4.231556-88.502524z" />
    </svg>{' '}
  </Icon>
)

export { EuroIcon }
