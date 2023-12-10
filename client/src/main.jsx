import ReactDOM from 'react-dom/client'

import './bootstrap.js'

import RouterProvider from './router'
import { AuthProvider } from 'hooks'
import ThemeProvider from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </ThemeProvider>
)
