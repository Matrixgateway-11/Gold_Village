import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts: Fraunces (headings, with optical sizing) and Manrope (text).
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/fraunces/opsz-italic.css'
import '@fontsource-variable/manrope/index.css'
// Design system, in cascade order. Page styles are imported by each page component.
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
