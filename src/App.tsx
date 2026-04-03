import { PMOPage } from './pmo/PMOPage'

/**
 * Project management minisite: always renders at `/`. Visual reference: https://ministite.vercel.app/
 * For deployments that mount the app only at `/work-management/pmo`, set Vite `base` and use the same URL in the browser.
 */
function App() {
  return <PMOPage />
}

export default App
