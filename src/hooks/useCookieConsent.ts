import { useState, useEffect } from 'react';
import CookieService from '../utils/cookieService';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const useCookieConsent = () => {
  const [settings, setSettings] = useState<CookieSettings>(() => CookieService.getSettings());
  const [hasConsent, setHasConsent] = useState<boolean>(() => {
    return localStorage.getItem('cookie-consent') !== null;
  });

  // Applica i cookie quando le impostazioni cambiano
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  // Aggiorna le impostazioni di consenso
  const updateConsent = (newSettings: CookieSettings) => {
    CookieService.saveSettings(newSettings);
    setSettings(newSettings);
    setHasConsent(true);
    applySettings(newSettings);
  };

  // Resetta il consenso (es. per implementare un "revoca consenso")
  const resetConsent = () => {
    CookieService.resetSettings();
    setSettings(CookieService.getSettings());
    setHasConsent(false);
  };

  // Applica le impostazioni dei cookie
  const applySettings = (currentSettings: CookieSettings) => {
    if (currentSettings.analytics) {
      enableAnalytics();
    }

    if (currentSettings.marketing) {
      enableMarketing();
    }
  };

  // Aggiungi lo script di Google Analytics
  const enableAnalytics = () => {
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_ANALYTICS_ID';
      
      const scriptInit = document.createElement('script');
      scriptInit.id = 'ga-init';
      scriptInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR_ANALYTICS_ID');
      `;
      
      document.head.appendChild(script);
      document.head.appendChild(scriptInit);
    }
  };

  // Aggiungi lo script Facebook Pixel
  const enableMarketing = () => {
    if (!document.getElementById('fb-pixel')) {
      const script = document.createElement('script');
      script.id = 'fb-pixel';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `;
      
      document.head.appendChild(script);
    }
  };

  // Ottieni l'attuale valore di consenso per una categoria
  const getConsent = (category: keyof CookieSettings) => {
    return settings[category];
  };

  return {
    hasConsent,
    settings,
    updateConsent,
    resetConsent,
    getConsent
  };
};

export default useCookieConsent; 