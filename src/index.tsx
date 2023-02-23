import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupStore } from './app/store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './styles/theme'
import { ColorModeScript } from '@chakra-ui/react'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/400.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <ChakraProvider theme={theme}>
        <Router>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
