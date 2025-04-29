import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import './CookieBanner.scss';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookie-consent');
    if (!cookieChoice) {
      // Show banner after small delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Apply saved settings
      try {
        const savedSettings = JSON.parse(cookieChoice);
        setCookieSettings(savedSettings);
        setVisible(false);
        applySettings(savedSettings);
      } catch (e) {
        console.error('Invalid cookie settings stored', e);
        localStorage.removeItem('cookie-consent');
        setVisible(true);
      }
    }
  }, []);

  const acceptAll = () => {
    const settings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    saveSettings(settings);
  };

  const acceptNecessaryOnly = () => {
    const settings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    saveSettings(settings);
  };

  const saveCustomSettings = () => {
    saveSettings(cookieSettings);
  };

  const saveSettings = (settings: CookieSettings) => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    applySettings(settings);
    setVisible(false);
  };

  const applySettings = (settings: CookieSettings) => {
    // Apply cookie settings
    if (settings.analytics) {
      // Enable analytics cookies/scripts
      enableAnalytics();
    }
    
    if (settings.marketing) {
      // Enable marketing cookies/scripts
      enableMarketing();
    }
  };

  const enableAnalytics = () => {
    // Example: Google Analytics
    // Only add the script if it doesn't exist already
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_ANALYTICS_ID';
      
      const scriptInit = document.createElement('script');
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

  const enableMarketing = () => {
    // Example: Facebook Pixel
    // Only add the script if it doesn't exist already
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

  const handleInputChange = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Can't toggle necessary cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__wrapper">
        <button 
          className="cookie-banner__close"
          onClick={() => acceptNecessaryOnly()}
          aria-label="Close cookie banner"
        >
          <FiX />
        </button>
        
        <div className="cookie-banner__content">
          <div className="cookie-banner__header">
            <h4>🍪 Cookie Policy</h4>
          </div>
          
          <p className="cookie-banner__text">
            Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. 
            Alcuni cookie sono necessari per il funzionamento del sito, mentre altri ci aiutano a capire come interagisci con esso.
            {' '}
            <Link to="/cookies" className="cookie-banner__link" onClick={() => setVisible(false)}>
              Maggiori informazioni
            </Link>
          </p>
          
          {showDetails && (
            <div className="cookie-banner__options">
              <div className="cookie-banner__option">
                <label className="cookie-banner__checkbox">
                  <input 
                    type="checkbox" 
                    checked={cookieSettings.necessary} 
                    disabled 
                  />
                  <span className="cookie-banner__label">Cookie necessari</span>
                </label>
                <p className="cookie-banner__description">Essenziali per il funzionamento del sito</p>
              </div>
              
              <div className="cookie-banner__option">
                <label className="cookie-banner__checkbox">
                  <input 
                    type="checkbox" 
                    checked={cookieSettings.analytics} 
                    onChange={() => handleInputChange('analytics')}
                  />
                  <span className="cookie-banner__label">Cookie analitici</span>
                </label>
                <p className="cookie-banner__description">Ci aiutano a capire come utilizzi il sito</p>
              </div>
              
              <div className="cookie-banner__option">
                <label className="cookie-banner__checkbox">
                  <input 
                    type="checkbox" 
                    checked={cookieSettings.marketing} 
                    onChange={() => handleInputChange('marketing')}
                  />
                  <span className="cookie-banner__label">Cookie di marketing</span>
                </label>
                <p className="cookie-banner__description">Permettono di mostrarti contenuti personalizzati</p>
              </div>
            </div>
          )}
          
          <div className="cookie-banner__actions">
            <button 
              className="cookie-banner__button cookie-banner__button--outline"
              onClick={() => acceptNecessaryOnly()}
            >
              Solo necessari
            </button>
            
            {!showDetails ? (
              <button 
                className="cookie-banner__button cookie-banner__button--outline"
                onClick={() => setShowDetails(true)}
              >
                Personalizza
              </button>
            ) : (
              <button 
                className="cookie-banner__button cookie-banner__button--outline"
                onClick={saveCustomSettings}
              >
                Salva preferenze
              </button>
            )}
            
            <button 
              className="cookie-banner__button cookie-banner__button--fill"
              onClick={acceptAll}
            >
              Accetta tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 