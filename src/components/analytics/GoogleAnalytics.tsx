import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ID di tracciamento
const GA_TRACKING_ID = 'G-2DDR6SBX2Q'; // ID reale di Google Analytics
const GTM_ID = 'GTM-ABC123XYZ'; // Sostituire con l'ID reale di Google Tag Manager

// Estende l'interfaccia Window per includere le funzioni di Google Analytics e Tag Manager
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GoogleAnalytics: React.FC = () => {
  // Utilizziamo useLocation() per tracciare il cambio di pagina
  // Se il componente è usato al di fuori di un Router, questo potrebbe essere undefined
  const location = useLocation();
  const pathname = location?.pathname || '';
  const search = location?.search || '';

  // Inizializza Google Tag Manager
  useEffect(() => {
    if (!document.getElementById('gtm-script')) {
      // Crea lo script per Google Tag Manager
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `;
      document.head.appendChild(script);
      
      // Crea il noscript per Google Tag Manager
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, []);

  // Inizializza Google Analytics (può essere gestito tramite GTM, ma lo includiamo anche qui per sicurezza)
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
      // Per Google Analytics
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname + search,
      });
      
      // Per Google Tag Manager - invia evento di cambio pagina
      window.dataLayer.push({
        event: 'page_view',
        page: {
          path: pathname + search,
          title: document.title,
        }
      });
    }
  }, [location, pathname, search]);

  return null; // Questo componente non ha rendering visibile
};

export default GoogleAnalytics; 