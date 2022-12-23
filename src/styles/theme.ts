import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

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
      main: '#5ECE7B', // https://m2.material.io/inline-tools/color
      50: '#e4f7e8',
      100: '#bee9c7',
      200: '#92dba2',
      300: '#5ece7c',
      400: '#28c35e',
      500: '#00b744',
      600: '#00a73a',
      700: '#00952f',
      800: '#008424',
      900: '#006410',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
}

export default extendTheme(theme)
