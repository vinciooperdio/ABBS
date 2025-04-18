import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import '../styles/LegalPages.scss';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO
        title={language === 'it' ? 'Termini di Servizio | ABBS' : 'Terms of Service | ABBS'}
        description={language === 'it' ? 
          "Termini e condizioni di utilizzo della piattaforma ABBS per la gestione degli abbonamenti." : 
          "Terms and conditions for using the ABBS subscription management platform."}
        pathname="/terms"
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
            <h1>{language === 'it' ? 'Termini di Servizio' : 'Terms of Service'}</h1>
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
              <p>Benvenuto su ABBS ("noi", "nostro/a"). Utilizzando la nostra applicazione, accetti i presenti Termini di Servizio ("Termini"). Ti preghiamo di leggerli attentamente.</p>
              <p>Questi Termini costituiscono un accordo legalmente vincolante tra te e ABBS in relazione al tuo utilizzo dei nostri servizi. Se non accetti questi Termini, ti preghiamo di non utilizzare i nostri servizi.</p>
            </section>

            <section>
              <h2>2. Descrizione del Servizio</h2>
              <p>ABBS è una piattaforma che ti permette di gestire i tuoi abbonamenti digitali e fisici in un unico posto. I nostri servizi includono il tracciamento degli abbonamenti, notifiche di rinnovo, confronto di prezzi e altre funzionalità relative alla gestione degli abbonamenti.</p>
            </section>

            <section>
              <h2>3. Account Utente</h2>
              <p>Per utilizzare alcune funzionalità della nostra applicazione, potresti dover creare un account. Sei responsabile del mantenimento della riservatezza delle tue credenziali di accesso e di tutte le attività che si verificano sotto il tuo account.</p>
              <p>Ci riserviamo il diritto di disabilitare qualsiasi account utente, in qualsiasi momento, se, a nostro ragionevole parere, hai violato qualsiasi disposizione dei presenti Termini.</p>
            </section>

            <section>
              <h2>4. Diritti di Proprietà Intellettuale</h2>
              <p>Tutti i contenuti, le funzionalità e la progettazione dell'applicazione sono di proprietà di ABBS, dei suoi licenzianti o di altri fornitori e sono protetti da leggi sul copyright, marchi, brevetti, segreti commerciali e altre leggi sulla proprietà intellettuale.</p>
              <p>Non è consentito riprodurre, distribuire, modificare, creare opere derivate, mostrare pubblicamente, eseguire pubblicamente, ripubblicare, scaricare, memorizzare o trasmettere qualsiasi materiale dai nostri servizi, ad eccezione di quanto consentito espressamente da questi Termini.</p>
            </section>

            <section>
              <h2>5. Contenuti Utente</h2>
              <p>Potresti essere in grado di pubblicare, inviare, caricare o comunque rendere disponibile attraverso i nostri servizi determinati contenuti ("Contenuti Utente"). Conservi tutti i diritti sui tuoi Contenuti Utente, ma ci concedi una licenza mondiale, non esclusiva, trasferibile, sublicenziabile, libera da royalty per utilizzare, riprodurre, modificare, adattare, pubblicare, tradurre, creare opere derivate, distribuire e visualizzare tali Contenuti Utente.</p>
              <p>Dichiari e garantisci che: (i) possiedi i Contenuti Utente o hai il diritto di utilizzarli e concederci i diritti e le licenze previste nei presenti Termini, e (ii) la pubblicazione dei tuoi Contenuti Utente sui o attraverso i Servizi non viola i diritti sulla privacy, i diritti di pubblicità, i diritti d'autore, i diritti contrattuali o qualsiasi altro diritto di qualsiasi persona o entità.</p>
            </section>

            <section>
              <h2>6. Limitazioni di Responsabilità</h2>
              <p>In nessun caso ABBS, i suoi direttori, dipendenti, partner, agenti, fornitori o affiliati saranno responsabili per qualsiasi danno indiretto, incidentale, speciale, consequenziale o punitivo, inclusi senza limitazione, perdita di profitti, dati, uso, avviamento, o altre perdite immateriali, derivanti da o relative a: (i) il tuo accesso o utilizzo o impossibilità di accedere o utilizzare i Servizi; (ii) qualsiasi condotta o contenuto di terze parti sui Servizi; (iii) qualsiasi contenuto ottenuto dai Servizi; e (iv) accesso non autorizzato, utilizzo o alterazione delle tue trasmissioni o contenuti, sia basato su garanzia, contratto, illecito civile (inclusa la negligenza) o qualsiasi altra teoria legale, indipendentemente dal fatto che siamo stati informati della possibilità di tali danni.</p>
            </section>

            <section>
              <h2>7. Modifiche ai Termini</h2>
              <p>Ci riserviamo il diritto, a nostra esclusiva discrezione, di modificare o sostituire questi Termini in qualsiasi momento. Se una revisione è materiale, cercheremo di fornire un preavviso di almeno 30 giorni prima che i nuovi termini entrino in vigore. Ciò che costituisce un cambiamento materiale sarà determinato a nostra esclusiva discrezione.</p>
              <p>Continuando ad accedere o utilizzare i nostri servizi dopo che tali revisioni diventano effettive, accetti di essere vincolato dai termini rivisti. Se non accetti i nuovi termini, non sei autorizzato a utilizzare i servizi.</p>
            </section>

            <section>
              <h2>8. Indennizzo</h2>
              <p>Accetti di difendere, indennizzare e tenere indenne ABBS e i suoi dipendenti, appaltatori, agenti, funzionari e direttori, da e contro qualsiasi rivendicazione, danno, obbligo, perdita, responsabilità, costo o debito, e spese (incluse, ma non limitate a, spese legali) derivanti da: (i) il tuo utilizzo e accesso ai Servizi; (ii) la tua violazione di qualsiasi termine dei presenti Termini; (iii) la tua violazione di qualsiasi diritto di terzi, inclusi, senza limitazione, qualsiasi diritto di copyright, proprietà o privacy; o (iv) qualsiasi rivendicazione che i tuoi Contenuti Utente abbiano causato danni a terzi.</p>
            </section>

            <section>
              <h2>9. Legge Applicabile e Risoluzione delle Controversie</h2>
              <p>Questi Termini saranno regolati e interpretati in conformità con le leggi italiane, senza riguardo ai suoi conflitti di principi di legge.</p>
              <p>Qualsiasi controversia derivante da o relativa ai presenti Termini, inclusa qualsiasi questione riguardante la loro esistenza, validità o risoluzione, sarà definitivamente risolta mediante arbitrato secondo le regole della Camera Arbitrale di Milano, da uno o più arbitri nominati in conformità con dette regole.</p>
            </section>

            <section>
              <h2>10. Contatti</h2>
              <p>Per domande sui presenti Termini di Servizio, contattaci all'indirizzo: <a href="mailto:legal@abbs.one">legal@abbs.one</a></p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService; 