import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/LegalPages.scss';

const CookiePolicy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="legal-page">
      <SEO
        title={language === 'it' ? 'Cookie Policy | ABBS' : 'Cookie Policy | ABBS'}
        description={language === 'it' ? 
          "Informativa sull'utilizzo dei cookie sul sito web e sulla piattaforma ABBS." : 
          "Information about cookie usage on the ABBS website and platform."}
        pathname="/cookies"
      />
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <motion.div 
            className="legal-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{language === 'it' ? 'Cookie Policy' : 'Cookie Policy'}</h1>
            <p className="last-updated">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
          </motion.div>

          <motion.div 
            className="legal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section>
              <h2>1. Introduzione</h2>
              <p>Questa Cookie Policy spiega come ABBS ("noi", "nostro/a") utilizza i cookie e tecnologie simili quando visiti o interagisci con il nostro sito web e la nostra applicazione.</p>
              <p>Questa policy fornisce informazioni su cosa sono i cookie, quali cookie utilizziamo e perché, e come puoi controllare l'uso dei cookie.</p>
            </section>

            <section>
              <h2>2. Cosa Sono i Cookie</h2>
              <p>I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o smartphone) quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente, nonché per fornire informazioni ai proprietari del sito.</p>
              <p>I cookie possono essere "cookie di prima parte" o "cookie di terze parti". I cookie di prima parte sono impostati dal sito che stai visitando, mentre i cookie di terze parti sono impostati da un servizio di terze parti che è utilizzato dal sito che stai visitando.</p>
            </section>

            <section>
              <h2>3. Tipi di Cookie che Utilizziamo</h2>
              <p>Utilizziamo diversi tipi di cookie per varie finalità. I cookie possono essere classificati come segue:</p>
              
              <h3>3.1 Cookie Essenziali/Necessari</h3>
              <p>Questi cookie sono necessari per il funzionamento del nostro sito web e non possono essere disattivati nei nostri sistemi. Solitamente vengono impostati solo in risposta ad azioni da te effettuate che costituiscono una richiesta di servizi, come l'impostazione delle preferenze di privacy, l'accesso o la compilazione di moduli. Puoi impostare il tuo browser per bloccare o avvisarti di questi cookie, ma alcune parti del sito potrebbero non funzionare correttamente.</p>
              
              <h3>3.2 Cookie di Preferenza</h3>
              <p>Questi cookie consentono al nostro sito web di ricordare le scelte che hai fatto in passato, come le preferenze di lingua o regione, e fornire funzionalità migliorate e più personalizzate. Questi cookie possono anche essere utilizzati per ricordare le modifiche che hai apportato alla dimensione del testo, ai font e ad altre parti delle pagine web che puoi personalizzare.</p>
              
              <h3>3.3 Cookie Statistici/Analitici</h3>
              <p>Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali pagine sono le più e le meno popolari e vedere come i visitatori si muovono nel sito. Tutte le informazioni raccolte da questi cookie sono aggregate e quindi anonime.</p>
              
              <h3>3.4 Cookie di Marketing</h3>
              <p>Questi cookie possono essere impostati attraverso il nostro sito dai nostri partner pubblicitari. Possono essere utilizzati da queste aziende per costruire un profilo dei tuoi interessi e mostrarti annunci pertinenti su altri siti. Non memorizzano direttamente informazioni personali, ma si basano sull'identificazione univoca del tuo browser e dispositivo internet.</p>
            </section>

            <section>
              <h2>4. Cookie di Terze Parti</h2>
              <p>Oltre ai nostri cookie proprietari, possiamo utilizzare vari cookie di terze parti per segnalare statistiche di utilizzo del sito, fornire annunci pubblicitari sui nostri siti e così via. Questi includono:</p>
              <ul>
                <li><strong>Google Analytics:</strong> Utilizzato per raccogliere dati sul comportamento degli utenti sul nostro sito.</li>
                <li><strong>Google Ads:</strong> Utilizzato per misurare le interazioni con gli annunci pubblicitari e prevenire che lo stesso annuncio venga mostrato più volte.</li>
                <li><strong>Facebook Pixel:</strong> Utilizzato per monitorare l'efficacia della pubblicità di Facebook e per scopi di retargeting.</li>
                <li><strong>Hotjar:</strong> Utilizzato per analizzare il comportamento degli utenti e feedback sui nostri prodotti e servizi.</li>
              </ul>
            </section>

            <section>
              <h2>5. Come Controllare i Cookie</h2>
              <p>Puoi controllare e gestire i cookie in vari modi. Tieni presente che la rimozione o il blocco dei cookie può influire sulla tua esperienza utente e parti del nostro sito potrebbero non essere più completamente accessibili.</p>
              
              <h3>5.1 Impostazioni del Browser</h3>
              <p>La maggior parte dei browser ti permette di controllare i cookie attraverso le loro impostazioni. Questi settaggi si trovano solitamente nel menu "opzioni" o "preferenze" del tuo browser. Per comprendere queste impostazioni, i seguenti link possono essere utili, altrimenti dovresti usare l'opzione "Aiuto" nel tuo browser per maggiori dettagli:</p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Cookie settings in Chrome</a></li>
                <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer">Cookie settings in Firefox</a></li>
                <li><a href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Cookie settings in Internet Explorer</a></li>
                <li><a href="https://support.apple.com/it-it/HT201265" target="_blank" rel="noopener noreferrer">Cookie settings in Safari</a></li>
              </ul>
              
              <h3>5.2 Opt-Out da Cookie di Terze Parti</h3>
              <p>Alcuni servizi di terze parti che utilizziamo offrono opzioni di opt-out specifiche:</p>
              <ul>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Opt-out da Google Analytics</a></li>
                <li><a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer">Gestione preferenze pubblicitarie su Facebook</a></li>
              </ul>
              
              <h3>5.3 Banner dei Cookie</h3>
              <p>Quando visiti il nostro sito per la prima volta, ti viene presentato un banner dei cookie che ti permette di accettare o rifiutare i cookie non essenziali. Puoi modificare le tue preferenze in qualsiasi momento visitando la nostra pagina delle impostazioni dei cookie.</p>
            </section>

            <section>
              <h2>6. Durata dei Cookie</h2>
              <p>I cookie hanno una durata variabile sul tuo dispositivo, che dipende dalla loro natura:</p>
              <ul>
                <li><strong>Cookie di sessione:</strong> Questi cookie sono temporanei e scadono una volta che chiudi il browser.</li>
                <li><strong>Cookie persistenti:</strong> Questi cookie rimangono sul tuo dispositivo fino a quando non scadono o finché non li elimini manualmente.</li>
              </ul>
            </section>

            <section>
              <h2>7. Utilizzo delle Informazioni Raccolte</h2>
              <p>Le informazioni raccolte attraverso i cookie vengono utilizzate per vari scopi, tra cui:</p>
              <ul>
                <li>Garantire il corretto funzionamento del sito e dell'applicazione</li>
                <li>Salvare le preferenze dell'utente per future visite</li>
                <li>Migliorare la velocità e la sicurezza del sito</li>
                <li>Analizzare come gli utenti utilizzano il nostro sito per migliorare l'esperienza utente</li>
                <li>Personalizzare i contenuti e gli annunci pubblicitari</li>
              </ul>
            </section>

            <section>
              <h2>8. Aggiornamenti alla Cookie Policy</h2>
              <p>Possiamo aggiornare questa Cookie Policy di tanto in tanto per riflettere, ad esempio, cambiamenti nei cookie che utilizziamo o per altre ragioni operative, legali o normative. Ti invitiamo quindi a consultare regolarmente questa Cookie Policy per rimanere informato sul nostro utilizzo dei cookie e delle tecnologie correlate.</p>
              <p>La data in cima a questa Policy indica l'ultima volta che è stata aggiornata.</p>
            </section>

            <section>
              <h2>9. Ulteriori Informazioni</h2>
              <p>Se hai domande su questa Cookie Policy o sul nostro utilizzo dei cookie, contattaci all'indirizzo: <a href="mailto:privacy@abbs.one">privacy@abbs.one</a></p>
              <p>Per maggiori informazioni generali sui cookie e su come gestirli, visita <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer">aboutcookies.org</a> o <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.</p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy; 