import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './components/LandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
