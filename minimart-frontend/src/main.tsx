import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './cartContext'
import { AuthProvider } from './authContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
       <CartProvider>
         <App />
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
