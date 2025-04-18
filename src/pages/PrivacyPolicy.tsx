import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/LegalPages.scss';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO
        title={language === 'it' ? 'Informativa sulla Privacy | ABBS' : 'Privacy Policy | ABBS'}
        description={language === 'it' ? 
          "Informativa sulla privacy e sul trattamento dei dati personali della piattaforma ABBS." : 
          "Privacy policy and personal data processing information for the ABBS platform."}
        pathname="/privacy"
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
            <h1>{language === 'it' ? 'Informativa sulla Privacy' : 'Privacy Policy'}</h1>
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
              <p>La presente Privacy Policy descrive come ABBS ("noi", "nostro/a") raccoglie, utilizza e divulga i tuoi dati personali quando utilizzi la nostra applicazione e i nostri servizi.</p>
              <p>Trattiamo i tuoi dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea e altre leggi sulla privacy applicabili.</p>
            </section>

            <section>
              <h2>2. Informazioni che Raccogliamo</h2>
              <p>Raccogliamo diversi tipi di informazioni da e sui nostri utenti, tra cui:</p>
              <ul>
                <li><strong>Informazioni identificative personali</strong> come nome, indirizzo e-mail, numero di telefono, che ci fornisci direttamente quando ti registri o utilizzi i nostri servizi.</li>
                <li><strong>Informazioni sugli abbonamenti</strong> che includono dettagli sui tuoi abbonamenti, date di rinnovo, costi e fornitori di servizi.</li>
                <li><strong>Informazioni di pagamento</strong> che possono includere dettagli della carta di credito o informazioni sul conto bancario, che vengono elaborate da fornitori di servizi di pagamento sicuri.</li>
                <li><strong>Informazioni sull'utilizzo</strong> che riguardano come interagisci con la nostra applicazione, tra cui le funzionalità che utilizzi, il tempo trascorso nell'app e i pattern di utilizzo.</li>
                <li><strong>Dati del dispositivo</strong> come l'indirizzo IP, il tipo di browser, il sistema operativo e altre informazioni tecniche sul dispositivo utilizzato per accedere ai nostri servizi.</li>
                <li><strong>Informazioni sulla posizione</strong> che possono essere raccolte attraverso il GPS, l'indirizzo IP o altri metodi, se acconsenti a fornirci l'accesso alla tua posizione.</li>
              </ul>
            </section>

            <section>
              <h2>3. Come Utilizziamo le Tue Informazioni</h2>
              <p>Utilizziamo le informazioni raccolte per:</p>
              <ul>
                <li>Fornire, gestire e migliorare i nostri servizi</li>
                <li>Elaborare le tue transazioni e gestire il tuo account</li>
                <li>Inviarti notifiche relative ai tuoi abbonamenti, come promemoria di rinnovo</li>
                <li>Comunicare con te riguardo al tuo account, aggiornamenti del servizio o altre informazioni importanti</li>
                <li>Personalizzare la tua esperienza e fornirti contenuti e offerte più rilevanti</li>
                <li>Analizzare come gli utenti interagiscono con i nostri servizi per migliorarli</li>
                <li>Rilevare, prevenire e affrontare problemi tecnici, frodi o attività illegali</li>
                <li>Adempiere agli obblighi legali e normativi</li>
              </ul>
            </section>

            <section>
              <h2>4. Condivisione delle Informazioni</h2>
              <p>Possiamo condividere le tue informazioni personali con:</p>
              <ul>
                <li><strong>Fornitori di servizi</strong> che ci supportano nelle nostre operazioni commerciali, come l'elaborazione dei pagamenti, l'hosting dei dati e i servizi di analisi.</li>
                <li><strong>Partner commerciali</strong> con cui collaboriamo per offrirti servizi congiunti o promozioni, solo con il tuo consenso esplicito.</li>
                <li><strong>Autorità legali</strong> quando siamo tenuti a farlo per legge o in risposta a procedimenti legali validi.</li>
                <li><strong>Acquirenti o successori</strong> in caso di fusione, disinvestimento, ristrutturazione, riorganizzazione, scioglimento o altra vendita o trasferimento di alcuni o tutti i nostri beni.</li>
              </ul>
              <p>Non vendiamo, affittiamo o divulghiamo in altro modo i tuoi dati personali a terzi per finalità di marketing senza il tuo consenso esplicito.</p>
            </section>

            <section>
              <h2>5. Sicurezza dei Dati</h2>
              <p>Implementiamo misure di sicurezza ragionevoli e appropriate per proteggere i tuoi dati personali da perdita, uso improprio e accesso non autorizzato, divulgazione, alterazione e distruzione. Tuttavia, nessun metodo di trasmissione via internet o di archiviazione elettronica è sicuro al 100%, quindi non possiamo garantire una sicurezza assoluta.</p>
            </section>

            <section>
              <h2>6. Conservazione dei Dati</h2>
              <p>Conserviamo i tuoi dati personali solo per il tempo necessario a soddisfare le finalità per cui li abbiamo raccolti, incluso l'adempimento di qualsiasi requisito legale, contabile o di rendicontazione. Il periodo di conservazione dipende dal tipo di dati e dal loro scopo.</p>
            </section>

            <section>
              <h2>7. I Tuoi Diritti sulla Privacy</h2>
              <p>In base al GDPR e altre leggi sulla privacy applicabili, potresti avere i seguenti diritti:</p>
              <ul>
                <li><strong>Diritto di accesso</strong> alle tue informazioni personali</li>
                <li><strong>Diritto di rettifica</strong> di informazioni inesatte o incomplete</li>
                <li><strong>Diritto alla cancellazione</strong> (diritto all'oblio) in determinate circostanze</li>
                <li><strong>Diritto di limitazione del trattamento</strong> in determinate circostanze</li>
                <li><strong>Diritto alla portabilità dei dati</strong> per trasferire i tuoi dati ad un altro fornitore</li>
                <li><strong>Diritto di opposizione</strong> al trattamento in determinate circostanze</li>
                <li><strong>Diritto di non essere soggetto</strong> a decisioni basate unicamente sul trattamento automatizzato</li>
              </ul>
              <p>Per esercitare questi diritti, contattaci utilizzando i dettagli forniti nella sezione "Contattaci".</p>
            </section>

            <section>
              <h2>8. Cookie e Tecnologie Simili</h2>
              <p>Utilizziamo cookie e tecnologie di tracciamento simili per raccogliere e archiviare informazioni quando visiti o interagisci con la nostra applicazione. Per ulteriori informazioni sui cookie che utilizziamo e su come puoi controllare i cookie, consulta la nostra Cookie Policy.</p>
            </section>

            <section>
              <h2>9. Privacy dei Minori</h2>
              <p>I nostri servizi non sono destinati a persone di età inferiore ai 16 anni e non raccogliamo consapevolmente dati personali da minori di 16 anni. Se sei un genitore o tutore e ritieni che tuo figlio ci abbia fornito informazioni personali, contattaci in modo che possiamo intraprendere le azioni necessarie.</p>
            </section>

            <section>
              <h2>10. Modifiche alla Presente Privacy Policy</h2>
              <p>Possiamo aggiornare la nostra Privacy Policy di tanto in tanto. Ti informeremo di eventuali modifiche sostanziali pubblicando la nuova Privacy Policy su questa pagina e, se le modifiche sono significative, ti invieremo una notifica.</p>
            </section>

            <section>
              <h2>11. Trasferimenti Internazionali</h2>
              <p>I tuoi dati personali possono essere trasferiti ed elaborati in paesi diversi dal tuo paese di residenza, dove potrebbero essere in vigore leggi sulla protezione dei dati diverse. In tali casi, adottiamo misure appropriate per garantire che i tuoi dati personali rimangano protetti in conformità con questa Privacy Policy e le leggi applicabili.</p>
            </section>

            <section>
              <h2>12. Contattaci</h2>
              <p>Se hai domande o preoccupazioni sulla nostra Privacy Policy o sulle pratiche relative ai tuoi dati personali, contattaci all'indirizzo: <a href="mailto:privacy@abbs.one">privacy@abbs.one</a></p>
              <p>Responsabile della protezione dei dati: <a href="mailto:dpo@abbs.one">dpo@abbs.one</a></p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy; 