import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
// Arabic glyphs (unicode-range: only downloaded when Arabic text is on the page)
import '@fontsource-variable/noto-sans-arabic'
import './styles.css'
import App from './App'
import { LangProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
