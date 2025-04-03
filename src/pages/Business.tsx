import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBarChart2, FiDollarSign, FiXCircle, FiCheck, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { FaChartLine, FaBolt, FaChartBar, FaLock, FaRandom, FaCheckCircle, FaCogs, FaFileInvoiceDollar, FaGlobe, FaHandshake, FaMoneyBillWave, FaRocket, FaShieldAlt, FaSyncAlt, FaTable, FaThumbsUp, FaTimesCircle, FaUsersCog } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SectionBackground from '../components/ui/SectionBackground';
import NebulaBackground from '../components/ui/NebulaBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/ui/Navbar';
import '../styles/Business.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Business: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Data for problems section
  const problems = [
    {
      icon: <FaFileInvoiceDollar />,
      title: t('inefficientManagement'),
      description: t('inefficientManagementDesc')
    },
    {
      icon: <FaMoneyBillWave />,
      title: t('hiddenCosts'),
      description: t('hiddenCostsDesc')
    },
    {
      icon: <FaGlobe />,
      title: t('limitedCompatibility'),
      description: t('limitedCompatibilityDesc')
    },
    {
      icon: <FaUsersCog />,
      title: t('scalabilityIssues'),
      description: t('scalabilityIssuesDesc')
    }
  ];

  // Data for benefits section
  const benefits = [
    {
      icon: <FaRocket />,
      title: 'Automazione Completa',
      description: 'Gestione automatizzata degli abbonamenti e dei servizi, con notifiche e rinnovi programmati per non perdere mai una scadenza.'
    },
    {
      icon: <FaChartLine />,
      title: 'Analisi Avanzate',
      description: 'Dashboard intuitiva con analisi dettagliate sui costi, sull\'utilizzo e sulle potenziali ottimizzazioni da implementare.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Sicurezza Superiore',
      description: 'Protezione dei dati con crittografia di livello bancario e conformità alle normative GDPR e altre regolamentazioni internazionali.'
    },
    {
      icon: <FaSyncAlt />,
      title: 'Integrazione Senza Limiti',
      description: 'Si connette con oltre 500 servizi in abbonamento e può essere integrato con i sistemi aziendali esistenti.'
    },
    {
      icon: <FaCogs />,
      title: 'Personalizzazione Totale',
      description: 'Adatta completamente l\'interfaccia e i flussi di lavoro alle esigenze specifiche della tua azienda.'
    },
    {
      icon: <FaHandshake />,
      title: 'Supporto Dedicato',
      description: 'Team di supporto dedicato disponibile 24/7 per aiutarti con qualsiasi problema o domanda.'
    }
  ];

  // Data for how it works section
  const steps = [
    {
      number: 1,
      title: 'Connetti',
      description: 'Integra facilmente i tuoi servizi in abbonamento esistenti e sincronizza i dati in pochi minuti.'
    },
    {
      number: 2,
      title: 'Gestisci',
      description: 'Monitora, ottimizza e automatizza la gestione di tutti i servizi dalla dashboard centralizzata.'
    },
    {
      number: 3,
      title: 'Risparmia',
      description: 'Identifica opportunità di risparmio, ottimizza le risorse e riduci i costi operativi.'
    }
  ];

  // Data for comparison table
  const comparisonRows = [
    {
      feature: 'Gestione Centralizzata',
      abbs: true,
      traditional: false
    },
    {
      feature: 'Automazione Completa',
      abbs: true,
      traditional: false
    },
    {
      feature: 'Analisi in Tempo Reale',
      abbs: true,
      traditional: false
    },
    {
      feature: 'Integrazioni Facili',
      abbs: true,
      traditional: 'limited'
    },
    {
      feature: 'Sicurezza Avanzata',
      abbs: true,
      traditional: 'limited'
    },
    {
      feature: 'Supporto Dedicato',
      abbs: true,
      traditional: 'limited'
    },
    {
      feature: 'Costi Operativi',
      abbs: 'low',
      traditional: 'high'
    },
    {
      feature: 'Tempo di Implementazione',
      abbs: 'minutes',
      traditional: 'weeks'
    }
  ];

  return (
    <div className="business-page">
      <Helmet>
        <title>ABBS Business | {language === 'it' ? 'Gestione Abbonamenti per Aziende' : 'Subscription Management for Businesses'}</title>
        <meta name="description" content={language === 'it' ? 
          "ABBS Business offre una soluzione completa per la gestione degli abbonamenti aziendali. Centralizza, ottimizza e risparmia sui costi con la nostra piattaforma intuitiva." : 
          "ABBS Business offers a complete solution for managing business subscriptions. Centralize, optimize and save costs with our intuitive platform."} />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="business-hero">
          <NebulaBackground />
          <div className="container">
            <div className="business-hero__center-wrapper">
              <motion.div 
                className="business-hero__text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="business-hero__title">
                  {t('businessTitle').split(' ').map((word, i, arr) => 
                    i === arr.length - 2 ? <span key={i}>{word} <span className="text-gradient">{arr[arr.length - 1]}</span></span> : 
                    i === arr.length - 1 ? null : 
                    <span key={i}>{word} </span>
                  )}
                </h1>
                <p className="business-hero__subtitle">
                  {t('businessSubtitle')}
                </p>
                <motion.div 
                  className="business-hero__cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link to="/register" className="button button--primary">
                    {t('freeTrial')} <FaRocket />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problematiche comuni */}
        <SectionBackground 
          variant="secondary" 
          className="business-problems"
          id="problems"
        >
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                {t('traditionalSystemProblems').split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? <span key={i}> <span className="text-gradient">{word}</span></span> : 
                  <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
                )}
              </h2>
              <p className="section-subtitle">
                {t('traditionalSystemProblemsDesc')}
              </p>
            </motion.div>
            
            <motion.div 
              className="problems-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {problems.map((problem, index) => (
                <motion.div 
                  key={index} 
                  className="problem-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="problem-icon">{problem.icon}</div>
                  <h3>{problem.title}</h3>
                  <p>{problem.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionBackground>

        {/* Soluzione: I vantaggi unici di ABBS */}
        <SectionBackground 
          variant="primary" 
          className="business-solution"
          id="benefits"
        >
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                La <span className="text-gradient">soluzione ABBS</span> per il tuo business
              </h2>
              <p className="section-subtitle">
                Una piattaforma completa che rivoluziona la gestione degli abbonamenti e dei servizi per la tua azienda, offrendo vantaggi concreti e misurabili.
              </p>
            </motion.div>

            <motion.div 
              className="benefits-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="benefit-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionBackground>

        {/* Come funziona */}
        <SectionBackground 
          variant="secondary" 
          className="business-how"
          id="how-it-works"
        >
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                <span className="text-gradient">Come funziona</span> ABBS Business
              </h2>
              <p className="section-subtitle">
                Implementare ABBS nella tua azienda è semplice e veloce. Ecco come iniziare in tre semplici passaggi.
              </p>
            </motion.div>

            <div className="business-how__content-vertical">
              <div className="business-how__steps-row">
                <motion.div 
                  className="steps-container-horizontal"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="step-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="step-number">{step.number}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div 
                className="dashboard-mockup-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="dashboard-mockup">
                  <div className="dashboard-header">
                    <div className="dashboard-logo">ABBS Business</div>
                    <div className="dashboard-nav">
                      <div className="dashboard-nav-item active">Dashboard</div>
                      <div className="dashboard-nav-item">Abbonamenti</div>
                      <div className="dashboard-nav-item">Analisi</div>
                      <div className="dashboard-nav-item">Impostazioni</div>
                    </div>
                  </div>
                  <div className="dashboard-content">
                    <div className="dashboard-cards">
                      <div className="dashboard-card dashboard-card--primary">
                        <div className="dashboard-card__title">Risparmio Mensile</div>
                        <div className="dashboard-card__value">€2,450</div>
                        <div className="dashboard-card__trend positive">+12% rispetto al mese scorso</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="dashboard-card__title">Abbonamenti Attivi</div>
                        <div className="dashboard-card__value">37</div>
                        <div className="dashboard-card__trend">+2 questo mese</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="dashboard-card__title">Prossimi Rinnovi</div>
                        <div className="dashboard-card__value">5</div>
                        <div className="dashboard-card__trend">Nei prossimi 7 giorni</div>
                      </div>
                    </div>
                    <div className="dashboard-chart">
                      <div className="dashboard-chart__header">
                        <div className="dashboard-chart__title">Trend Spese Abbonamenti</div>
                        <div className="dashboard-chart__period">
                          <div className="period-option">Settimana</div>
                          <div className="period-option active">Mese</div>
                          <div className="period-option">Anno</div>
                        </div>
                      </div>
                      <div className="dashboard-chart__graph">
                        <div className="chart-line"></div>
                        <div className="chart-bars">
                          <div className="chart-bar" style={{ height: '40%' }}></div>
                          <div className="chart-bar" style={{ height: '55%' }}></div>
                          <div className="chart-bar" style={{ height: '70%' }}></div>
                          <div className="chart-bar" style={{ height: '65%' }}></div>
                          <div className="chart-bar" style={{ height: '80%' }}></div>
                          <div className="chart-bar" style={{ height: '75%' }}></div>
                          <div className="chart-bar" style={{ height: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionBackground>

        {/* Tabella Comparativa */}
        <SectionBackground 
          variant="primary" 
          className="business-comparison"
          id="comparison"
        >
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                ABBS vs <span className="text-gradient">Sistemi Tradizionali</span>
              </h2>
              <p className="section-subtitle">
                Un confronto diretto tra ABBS e i sistemi tradizionali di gestione degli abbonamenti. Scopri perché le aziende stanno passando ad ABBS.
              </p>
            </motion.div>

            <motion.div 
              className="comparison-table-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Funzionalità</th>
                    <th>ABBS Business</th>
                    <th>Sistemi Tradizionali</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.feature}</td>
                      <td>
                        {row.abbs === true && <FaCheckCircle className="icon-check" />}
                        {row.abbs === 'limited' && <FaThumbsUp className="icon-warning" />}
                        {row.abbs === 'low' && <span className="text-gradient">Basso</span>}
                        {row.abbs === 'minutes' && <span className="text-gradient">Minuti</span>}
                      </td>
                      <td>
                        {row.traditional === false && <FaTimesCircle className="icon-cross" />}
                        {row.traditional === 'limited' && <FaThumbsUp className="icon-warning" />}
                        {row.traditional === 'high' && <span style={{ color: '#F44336' }}>Alto</span>}
                        {row.traditional === 'weeks' && <span style={{ color: '#F44336' }}>Settimane/Mesi</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </SectionBackground>

        {/* Call to Action finale */}
        <SectionBackground 
          variant="secondary" 
          className="business-cta"
          id="cta"
        >
          <div className="container">
            <motion.div 
              className="cta-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="cta-content">
                <FaRocket className="cta-icon text-gradient" />
                <h2>Inizia a ottimizzare oggi</h2>
                <p>Prova gratuitamente ABBS Business per 30 giorni. Nessuna carta di credito richiesta, nessun impegno.</p>
                
                <div className="cta-form">
                  <div className="form-group">
                    <input type="email" placeholder="Inserisci la tua email aziendale" />
                  </div>
                  <Link to="/register" className="button button--primary button--block">
                    Inizia la prova gratuita
                  </Link>
                </div>
                <p className="form-disclaimer">
                  Iscrivendoti accetti i nostri <Link to="/terms">Termini di Servizio</Link> e la <Link to="/privacy">Privacy Policy</Link>
                </p>
              </div>
            </motion.div>
          </div>
        </SectionBackground>
      </main>
      
      <Footer />
    </div>
  );
};

export default Business; 