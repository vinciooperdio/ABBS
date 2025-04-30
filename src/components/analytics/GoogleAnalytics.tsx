import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ID di tracciamento
const GA_TRACKING_ID = 'G-2DDR6SBX2Q'; // ID reale di Google Analytics

// Estende l'interfaccia Window per includere le funzioni di Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GoogleAnalytics: React.FC = () => {
  // Utilizziamo useLocation() per tracciare il cambio di pagina
  const location = useLocation();
  const pathname = location?.pathname || '';
  const search = location?.search || '';

  // Inizializza Google Analytics
  useEffect(() => {
    // Carica lo script di Google Analytics solo una volta
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname + search,
      });
    }
  }, []);

  // Traccia i cambiamenti di pagina
  useEffect(() => {
    if (window.gtag && location) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname + search,
      });
    }
  }, [location, pathname, search]);

  return null; // Questo componente non ha rendering visibile
};

export default GoogleAnalytics;