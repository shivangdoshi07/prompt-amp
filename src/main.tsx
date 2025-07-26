import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './animated-bg.css'
import './wiggle.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
