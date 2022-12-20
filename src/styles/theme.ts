import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }
// const config: ThemeConfig = {
//   initialColorMode: 'dark',
//   useSystemColorMode: false,
// }

export const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = {
  config,
  styles: {
    global: {
      //global styles go here
      body: {
        margin: 0,
      },
    },
  },
  colors: {
    primary: {
      main: '#5ECE7B',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
}

export default extendTheme(theme)
