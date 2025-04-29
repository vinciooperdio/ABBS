import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import CookieService from '../utils/cookieService';
import SEO from '../components/seo/SEO';
import './CookiePolicy.scss';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookiePolicy: React.FC = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<CookieSettings>(() => CookieService.getSettings());
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Non si può disattivare
    
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // Reset success message
    setSaved(false);
  };

  const saveSettings = () => {
    CookieService.saveSettings(settings);
    applySettings();
    setSaved(true);
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const acceptAll = () => {
    const allSettings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setSettings(allSettings);
    CookieService.saveSettings(allSettings);
    applySettings();
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const applySettings = () => {
    if (settings.analytics) {
      // Enable analytics
      enableAnalytics();
    }
    
    if (settings.marketing) {
      // Enable marketing
      enableMarketing();
    }
  };

  const enableAnalytics = () => {
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

  return (
    <>
      <SEO
        title={language === 'it' ? 'Cookie Policy | ABBS' : 'Cookie Policy | ABBS'}
        description={language === 'it' ? 
          'Informazioni sui cookie utilizzati su ABBS e su come gestire le preferenze.' : 
          'Information about cookies used on ABBS and how to manage your preferences.'
        }
        pathname="/cookies"
      />
      
      <Navbar />
      
      <main className="cookie-policy">
        <div className="cookie-policy__container">
          <div className="cookie-policy__header">
            <h1>Cookie Policy</h1>
            <p>Ultima modifica: {new Date().toLocaleDateString()}</p>
          </div>
          
          <section className="cookie-policy__section">
            <h2>Cos'è un cookie?</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente (computer, tablet, smartphone) dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie permettono ai siti web di ricordare le azioni e le preferenze dell'utente (come, ad esempio, i dati di login, la lingua preferita, le dimensioni dei caratteri, altre impostazioni di visualizzazione) in modo che non debbano essere indicate nuovamente quando l'utente torna su quel sito o naviga da una pagina all'altra di esso.
            </p>
          </section>
          
          <section className="cookie-policy__section">
            <h2>Tipi di cookie utilizzati</h2>
            <p>
              Il nostro sito utilizza diversi tipi di cookie, ciascuno con una funzione specifica. Di seguito una descrizione dei tipi di cookie utilizzati:
            </p>
            
            <div className="cookie-policy__cookie-types">
              <div className="cookie-policy__cookie-type">
                <h3>Cookie Necessari</h3>
                <p>
                  Questi cookie sono essenziali per il corretto funzionamento del sito web. Senza questi cookie, il sito web non potrebbe funzionare correttamente. Questi cookie non raccolgono informazioni personali.
                </p>
                <p className="cookie-policy__cookie-examples">
                  <strong>Esempi:</strong> Cookie di sessione, cookie per ricordare le preferenze di accessibilità
                </p>
              </div>
              
              <div className="cookie-policy__cookie-type">
                <h3>Cookie Analitici</h3>
                <p>
                  Questi cookie ci aiutano a capire come gli utenti interagiscono con il nostro sito web, fornendoci informazioni su quali pagine sono state visitate, quanto tempo è stato trascorso sul sito, e se ci sono stati errori. Questi cookie ci aiutano a migliorare continuamente l'esperienza utente.
                </p>
                <p className="cookie-policy__cookie-examples">
                  <strong>Esempi:</strong> Google Analytics, Hotjar
                </p>
              </div>
              
              <div className="cookie-policy__cookie-type">
                <h3>Cookie di Marketing</h3>
                <p>
                  Questi cookie vengono utilizzati per tracciare i visitatori sui siti web. Lo scopo è quello di visualizzare annunci pertinenti e coinvolgenti per il singolo utente e quindi più preziosi per editori e inserzionisti terzi.
                </p>
                <p className="cookie-policy__cookie-examples">
                  <strong>Esempi:</strong> Facebook Pixel, Google AdWords
                </p>
              </div>
            </div>
          </section>
          
          <section className="cookie-policy__section">
            <h2>Gestione delle preferenze</h2>
            <p>
              Puoi decidere quali cookie accettare modificando le tue preferenze in qualsiasi momento. I cookie necessari non possono essere disattivati poiché sono essenziali per il funzionamento del sito.
            </p>
            
            <div className="cookie-policy__preferences">
              <div className="cookie-policy__preference">
                <label className="cookie-policy__checkbox">
                  <input 
                    type="checkbox" 
                    checked={settings.necessary} 
                    disabled 
                  />
                  <span className="cookie-policy__label">Cookie necessari</span>
                </label>
                <p className="cookie-policy__description">Essenziali per il funzionamento del sito (non disattivabili)</p>
              </div>
              
              <div className="cookie-policy__preference">
                <label className="cookie-policy__checkbox">
                  <input 
                    type="checkbox" 
                    checked={settings.analytics} 
                    onChange={() => handleChange('analytics')}
                  />
                  <span className="cookie-policy__label">Cookie analitici</span>
                </label>
                <p className="cookie-policy__description">Ci aiutano a capire come utilizzi il sito</p>
              </div>
              
              <div className="cookie-policy__preference">
                <label className="cookie-policy__checkbox">
                  <input 
                    type="checkbox" 
                    checked={settings.marketing} 
                    onChange={() => handleChange('marketing')}
                  />
                  <span className="cookie-policy__label">Cookie di marketing</span>
                </label>
                <p className="cookie-policy__description">Permettono di mostrarti contenuti personalizzati</p>
              </div>
              
              {saved && (
                <div className="cookie-policy__success">
                  ✓ Le tue preferenze sono state salvate!
                </div>
              )}
              
              <div className="cookie-policy__buttons">
                <button 
                  className="cookie-policy__button cookie-policy__button--outline"
                  onClick={saveSettings}
                >
                  Salva preferenze
                </button>
                <button 
                  className="cookie-policy__button cookie-policy__button--fill"
                  onClick={acceptAll}
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </section>
          
          <section className="cookie-policy__section">
            <h2>Come disabilitare i cookie</h2>
            <p>
              Oltre a utilizzare gli strumenti forniti in questa pagina, puoi gestire le preferenze relative ai cookie direttamente all'interno del tuo browser ed impedire, ad esempio, che terze parti possano installarne. Attraverso le preferenze del browser è inoltre possibile eliminare i cookie installati in passato, incluso il cookie in cui vengono salvate le preferenze. È importante notare che disabilitando tutti i cookie, il funzionamento di questo sito potrebbe essere compromesso.
            </p>
            <p>
              Puoi trovare informazioni su come gestire i cookie nel tuo browser ai seguenti link:
            </p>
            <ul className="cookie-policy__links">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Microsoft Internet Explorer</a></li>
              <li><a href="https://support.microsoft.com/it-it/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
          </section>
          
          <section className="cookie-policy__section">
            <h2>Contattaci</h2>
            <p>
              Se hai domande o dubbi riguardo la nostra Cookie Policy, non esitare a contattarci:
            </p>
            <p>
              Email: privacy@abbs.one<br />
              Indirizzo: Via Example, 123 - 00100 Roma
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CookiePolicy; 