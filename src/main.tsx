import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import App from './App'
import Business from './pages/Business'
import './styles/global.scss'

// Importo le nuove pagine
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/business',
    element: <Business />
  },
  {
    path: '/terms',
    element: <TermsOfService />
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />
  },
  {
    path: '/cookies',
    element: <CookiePolicy />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>,
) 