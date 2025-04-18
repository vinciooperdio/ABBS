import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, ScrollRestoration, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import App from './App'
import Business from './pages/Business'
import './styles/global.scss'
import './App.scss'
import './components/ui/AirbnbStyleMap.scss'
import './components/ui/Navbar.scss'
import './components/ui/Sidebar.scss'
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Importo le nuove pagine
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'

// Componente per lo scroll to top automatico
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Wrapper per ogni pagina che include lo ScrollToTop
const withScrollToTop = (Component: React.ComponentType) => {
  return function WithScrollToTop(props: any) {
    return (
      <>
        <ScrollToTop />
        <Component {...props} />
      </>
    );
  };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <App />
      </>
    )
  },
  {
    path: '/business',
    element: (
      <>
        <ScrollRestoration />
        <Business />
      </>
    )
  },
  {
    path: '/terms',
    element: (
      <>
        <ScrollRestoration />
        <TermsOfService />
      </>
    )
  },
  {
    path: '/privacy',
    element: (
      <>
        <ScrollRestoration />
        <PrivacyPolicy />
      </>
    )
  },
  {
    path: '/cookies',
    element: (
      <>
        <ScrollRestoration />
        <CookiePolicy />
      </>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>,
) 