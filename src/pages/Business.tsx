import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue, AnimatePresence } from 'framer-motion';
import { FiClock, FiBarChart2, FiDollarSign, FiXCircle, FiCheck, FiAlertCircle, FiArrowRight, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { FaChartLine, FaBolt, FaChartBar, FaLock, FaRandom, FaCheckCircle, FaCogs, FaFileInvoiceDollar, FaGlobe, FaHandshake, FaMoneyBillWave, FaRocket, FaShieldAlt, FaSyncAlt, FaTable, FaThumbsUp, FaTimesCircle, FaUsersCog, FaBullseye, FaStore, FaCreditCard, FaBell, FaDoorOpen, FaCoins } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SectionBackground from '../components/ui/SectionBackground';
import NebulaBackground from '../components/ui/NebulaBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/ui/Navbar';
import '../styles/Business.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import heroVideo from '../assets/videos/hero.mp4';
import painVideo from '../assets/videos/pain.mp4';

// Rinomina per evitare conflitti
const businessBenefitsData = [
  {
    icon: <FaBullseye />, 
    title: "Visibilità Mirata",
    description: "ABBS ti offre visibilità all'interno di una rete attiva di utenti. Niente più costi pubblicitari inutili: promuovi i tuoi abbonamenti direttamente nella piattaforma.",
    colorClass: "benefit-black"
  },
  {
    icon: <FaStore />, 
    title: "Marketplace Integrato",
    description: "Porta i tuoi abbonamenti nella rete di ABBS. Visibilità immediata su un pubblico attivo, pronto a scoprire nuove offerte.",
    colorClass: "benefit-black"
  },
  {
    icon: <FaCogs />, 
    title: "Gestionale Multi-Servizio",
    description: "Pannello di controllo unico per personalizzare, attivare e modificare gli abbonamenti. Veloce da configurare, facile da usare.",
    colorClass: "benefit-black"
  },
  {
    icon: <FaCreditCard />, 
    title: "Pagamenti e Fatturazione",
    description: "Automatizza rinnovi e fatture. Ricevi i pagamenti in tempo reale, con un sistema sicuro e conforme alle normative.",
    colorClass: "benefit-blue"
  },
  {
    icon: <FaBell />, 
    title: "Notifiche e Reminder",
    description: "Riduci i mancati pagamenti: avvisi puntuali a clienti e gestori, scadenze sotto controllo e zero stress di rinnovo.",
    colorClass: "benefit-light-grey"
  },
  {
    icon: <FaDoorOpen />, 
    title: "Integrazione con Tornelli e Accessi",
    description: "Controlla entrate e uscite in palestre o eventi. Collegati ai tornelli esistenti e monitora in modo smart l'accesso clienti.",
    colorClass: "benefit-black"
  },
  {
    icon: <FaChartLine />, 
    title: "Analisi e Reportistica",
    description: "Dashboard avanzate per monitorare il ciclo di vita degli abbonamenti, capire trend e ottimizzare offerte e pricing.",
    colorClass: "benefit-yellow"
  },
  {
    icon: <FaShieldAlt />, 
    title: "Protezione Dati",
    description: "Sicurezza di livello enterprise, con crittografia e piena conformità GDPR. I dati di clienti e aziende restano protetti.",
    colorClass: "benefit-red"
  },
  {
    icon: <FaCoins />, 
    title: "Semplificazione Costi",
    description: "Risparmia su infrastrutture e software: con ABBS hai un'unica piattaforma, riduci le spese di sviluppo e i costi di integrazione.",
    colorClass: "benefit-light-grey"
  },
  {
    icon: <FaHandshake />, 
    title: "Cross-Selling e Partnership",
    description: "Crea sinergie con altri servizi: pacchetti condivisi, promozioni incrociate e nuove opportunità di guadagno.",
    colorClass: "benefit-black"
  },
];

const Business: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  
  // Global scroll progress
  const { scrollY } = useScroll();
  
  // InView states for sections
  const isBenefitsInView = useInView(benefitsRef, { once: false, amount: 0.3 });
  const isHowItWorksInView = useInView(howItWorksRef, { once: false, amount: 0.3 });
  const isMarketingInView = useInView(marketingRef, { once: false, amount: 0.3 });
  const isFaqInView = useInView(faqRef, { once: false, amount: 0.3 });
  const isFinalCtaInView = useInView(finalCtaRef, { once: false, amount: 0.3 });
  
  // Hero fade out as user scrolls down
  const heroOpacity = useTransform(
    scrollY,
    [0, window.innerHeight * 0.5],
    [1, 0]
  );
  
  // Video background visibility
  const videoBackgroundOpacity = useTransform(
    scrollY,
    [0, window.innerHeight * 5, window.innerHeight * 5.1],
    [1, 1, 0]
  );
  
  // Handle scroll and section transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const problemsHeight = problemsRef.current?.offsetHeight || 0;
      
      // Calculate the start position of each section
      const heroEnd = heroHeight * 0.5;
      const problem1Start = heroEnd;
      const problem1End = problem1Start + windowHeight;
      const problem2Start = problem1End;
      const problem2End = problem2Start + windowHeight;
      const problem3Start = problem2End;
      const problem3End = problem3Start + windowHeight;
      const problem4Start = problem3End;
      const problem4End = problem4Start + windowHeight;
      
      // Log per debug
      console.log('Scroll position:', scrollPosition);
      console.log('Active video index:', activeVideoIndex);
      
      // Determine active section and video
      if (scrollPosition < heroEnd) {
        setSectionIndex(0); // Hero section
        setActiveVideoIndex(0); // Hero video
      } else if (scrollPosition >= problem1Start && scrollPosition < problem4End) {
        // Tutti i problemi usano lo stesso video di sfondo
        if (scrollPosition >= problem1Start && scrollPosition < problem1End) {
          setSectionIndex(1); // Problem 1
        } else if (scrollPosition >= problem2Start && scrollPosition < problem2End) {
          setSectionIndex(2); // Problem 2
        } else if (scrollPosition >= problem3Start && scrollPosition < problem3End) {
          setSectionIndex(3); // Problem 3
        } else if (scrollPosition >= problem4Start && scrollPosition < problem4End) {
          setSectionIndex(4); // Problem 4
        }
        setActiveVideoIndex(1); // Problems video
      } else {
        setSectionIndex(5); // Beyond problems section
        setActiveVideoIndex(-1); // No video (hide all)
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate scroll-linked opacities for each problem
  const getProblemOpacity = (problemIndex: number) => {
    return useTransform(
      scrollY,
      [
        // For problem 1: start fading in at hero end, fully visible, then fade out
        // For subsequent problems: similar pattern but shifted down by windowHeight per problem
        window.innerHeight * (0.5 + (problemIndex - 1)),   // Start fade in
        window.innerHeight * (0.7 + (problemIndex - 1)),   // Fully visible
        window.innerHeight * (1.3 + (problemIndex - 1)),   // Start fade out
        window.innerHeight * (1.5 + (problemIndex - 1))    // Completely faded out
      ],
      [0, 1, 1, 0]
    );
  };
  
  // Calculate scroll-linked y translations for each problem
  const getProblemY = (problemIndex: number) => {
    return useTransform(
      scrollY,
      [
        window.innerHeight * (0.5 + (problemIndex - 1)),
        window.innerHeight * (0.7 + (problemIndex - 1)),
        window.innerHeight * (1.3 + (problemIndex - 1)),
        window.innerHeight * (1.5 + (problemIndex - 1))
      ],
      [100, 0, 0, -100]
    );
  };
  
  // Data for problems with dynamically calculated animations
  const problems = [
    {
      icon: "🔍",
      title: "Troppi gestionali, poca visibilità.",
      description: "Con ABBS centralizzi tutto: abbonamenti, promozioni e pagamenti. Meno costi, più efficienza, più clienti.",
      opacity: getProblemOpacity(1),
      y: getProblemY(1)
    },
    {
      icon: "📉",
      title: "Troppo tempo sprecato in attività ripetitive.",
      description: "Tra scadenze, rinnovi manuali e fatture da gestire, perdi tempo prezioso ogni giorno.\nCon ABBS automatizzi tutto e ti concentri su ciò che conta davvero: far crescere il tuo business.",
      opacity: getProblemOpacity(2),
      y: getProblemY(2)
    },
    {
      icon: "⚠️",
      title: "Servizi poco flessibili, opportunità sprecate.",
      description: "Se non puoi adattare la tua offerta ai bisogni reali dei clienti, stai perdendo occasioni di vendita.\nCon ABBS crei esperienze su misura che migliorano conversione e fedeltà.",
      opacity: getProblemOpacity(3),
      y: getProblemY(3)
    },
    {
      icon: "💸",
      title: "Costi alti, ritorni bassi.",
      description: "Gestionali tradizionali sono costosi, lenti da integrare e pieni di funzioni che non usi. ABBS ti offre solo ciò che serve davvero, riducendo sprechi e ottimizzando i guadagni.",
      opacity: getProblemOpacity(4),
      y: getProblemY(4),
      hasCta: true
    }
  ];

  // Data for benefits section
  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Più clienti, meno costi",
      description: "ABBS ti offre visibilità all'interno di una rete attiva di utenti. Niente più costi pubblicitari inutili: promuovi i tuoi abbonamenti direttamente nella piattaforma."
    },
    {
      icon: <FaCogs />,
      title: "Gestione smart degli abbonamenti",
      description: "Tutto in un unico gestionale: crea, personalizza e monitora i tuoi abbonamenti. Imposti promozioni, ricevi pagamenti e analizzi i dati in tempo reale."
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Fatturazione e rinnovi automatici",
      description: "Dì addio agli errori manuali. Con ABBS, rinnovi, pagamenti e notifiche sono automatizzati per una gestione fluida e senza stress."
    },
    {
      icon: <FaShieldAlt />,
      title: "Dati e pagamenti sempre al sicuro",
      description: "Gestiamo i tuoi dati e quelli dei tuoi clienti con sistemi conformi al GDPR e crittografia avanzata. Tu pensi al business, noi alla sicurezza."
    }
  ];

  // Data for marketing stats
  const marketingStats = [
    { value: '+600', label: t('marketingStat1') },
    { value: '94%', label: t('marketingStat2') },
    { value: '$20bn', label: t('marketingStat3') },
    { value: '~450mm', label: t('marketingStat4') }
  ];
  
  
  
  // Video sources
  const videoSources = [
    "https://cdn.abbs.one/videos/hero.mp4",
    "https://cdn.abbs.one/videos/pain.mp4"
  ];

  // Assumi che i dati FAQ siano definiti altrove, ad esempio:
  const faqData = [
    { question: t('faq1Question'), answer: t('faq1Answer') },
    { question: t('faq2Question'), answer: t('faq2Answer') },
    { question: t('faq3Question'), answer: t('faq3Answer') },
    { question: t('faq4Question'), answer: t('faq4Answer') },
    { question: t('faq5Question'), answer: t('faq5Answer') },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
        {/* Video sequence container - fixed position */}
        <motion.div 
          className="video-sequence-container"
          style={{ opacity: videoBackgroundOpacity }}
        >
          {videoSources.map((src, index) => (
            <div 
              key={index} 
              className={`video-item ${activeVideoIndex === index ? 'active' : ''}`}
            >
              <video
                className="video-background"
                autoPlay
                loop
                muted
                playsInline
                src={src}
              />
              <div className={`video-overlay ${index === 0 ? 'hero-overlay' : 'problem-overlay'}`} />
            </div>
          ))}
        </motion.div>

        {/* Hero Section */}
        <section className="business-hero" ref={heroRef}>
              <motion.div 
            className="business-hero__content"
            style={{ opacity: heroOpacity }}
          >
            <h1>{t('businessHeroTitle')}</h1>
            <p>{t('businessHeroSubtitle')}</p>
            <div className="business-hero__cta">
              <button className="button button--primary">{t('businessHeroCta1')}</button>
              <button className="button button--secondary">{t('businessHeroCta2')}</button>
            </div>
          </motion.div>
        </section>

        {/* Problems Section - One problem at a time */}
        <section className="business-problems" ref={problemsRef}>
          <div className="problems-content">
              {problems.map((problem, index) => (
                <motion.div 
                  key={index} 
                  className={`problem-item ${sectionIndex === index + 1 ? 'active' : ''}`}
                  style={{ 
                    opacity: problem.opacity,
                    y: problem.y
                  }}
                >
                  <div className="problem-content">
                    <div className="problem-icon">{problem.icon}</div>
                    <h2>{problem.title}</h2>
                    <p>{problem.description}</p>
                    {problem.hasCta && (
                      <div className="problem-cta">
                        <button className="button button--primary">{t('businessProblemsCta')}</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="business-benefits">
          <div className="business-benefits__content container">
            <h2>Vantaggi Principali</h2>
            <p>Scopri come ABBS può trasformare la gestione dei tuoi abbonamenti.</p>

            <div className="business-benefits__grid">
              {businessBenefitsData.map((benefit, index) => (
                <div key={index} className={`benefit-card ${benefit.colorClass}`}>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Più Giocosa */}
        <section ref={howItWorksRef} className="business-how-it-works">
          <motion.div 
            className="business-how-it-works__content"
            initial={{ opacity: 0, y: 50 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-gradient">{t('businessHowItWorksTitle')}</h2>
            <div className="business-how-it-works__interactive">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <motion.div 
                    className="screen-content active"
                    animate={isHowItWorksInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="app-header">
                      <span className="app-logo">ABBS</span>
                      <span className="app-user">
                        <span className="user-avatar">👤</span>
                      </span>
                    </div>
                    <div className="app-body">
                      <motion.div 
                        className="screen-step step-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="step-icon">👋</div>
                        <div className="step-content">
                          <h3>Benvenuto in ABBS</h3>
                          <p>Crea il tuo account in pochi secondi</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="screen-step step-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="step-icon">🔄</div>
                        <div className="step-content">
                          <h3>Importa i tuoi abbonamenti</h3>
                          <p>Collega account o scansiona email</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="screen-step step-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="step-icon">💰</div>
                        <div className="step-content">
                          <h3>Risparmia subito</h3>
                          <p>Ottimizza e riduci costi superflui</p>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="app-progress-bar"
                      initial={{ width: "0%" }}
                      animate={isHowItWorksInView ? { width: "85%" } : { width: "0%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    ></motion.div>
                  </motion.div>
                </div>
              </div>
              <div className="steps-container">
                <motion.div 
                  className="interactive-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isHowItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3 className="step-title">Collega ciò che hai, senza perdere nulla</h3>
                    <p>Hai già un gestionale? Non serve ripartire da zero. ABBS importa automaticamente tutti i tuoi dati e abbonamenti esistenti. Così puoi passare a un sistema più moderno, senza interruzioni.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="interactive-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isHowItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3 className="step-title">Inizia in pochi secondi</h3>
                    <p>Registrazione super veloce. Con email e password sei dentro. Nessuna curva di apprendimento: tutto è pensato per essere semplice fin dal primo accesso.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="interactive-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isHowItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3 className="step-title">Ottimizza e risparmia fin da subito</h3>
                    <p>ABBS analizza i tuoi abbonamenti e segnala quelli inutilizzati o duplicati. In media, le aziende che usano la nostra piattaforma risparmiano il 30% già nel primo anno.</p>
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.button 
              className="button button--primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >{t('businessHowItWorksCta')}</motion.button>
            </motion.div>
        </section>

        {/* Marketing Section - ULTRA WOW */}
        <section ref={marketingRef} className="business-marketing">
          <div className="business-marketing__sequence">
            <video
              className="business-marketing__video"
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.pixabay.com/video/2017/09/05/11832-233049403_large.mp4"
            />
            <div className="business-marketing__overlay" />
          </div>
          
          <div className="business-marketing__content">
            <motion.div 
              className="business-marketing__headline"
              initial={{ opacity: 0, y: 50 }}
              animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-gradient">{t('businessMarketingTitle')}</h2>
              <p>{t('businessMarketingText')}</p>
            </motion.div>

            <motion.div 
              className="business-marketing__case-studies"
              initial={{ opacity: 0, y: 30 }}
              animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="case-study-title">
                Piattaforme che hanno rivoluzionato i settori
              </div>
              <div className="case-studies-grid">
                <motion.div 
                  className="case-study-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="case-study-image">
                    <img src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Airbnb Case Study" />
                    <div className="case-study-logo">
                      <img src="https://cdn.worldvectorlogo.com/logos/airbnb.svg" alt="Airbnb logo" />
                    </div>
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">Airbnb</div>
                    <div className="case-study-subtitle">Rivoluzione nel settore ospitalità</div>
                    <div className="case-study-desc">
                      Airbnb ha trasformato il mercato dell'ospitalità creando una piattaforma che connette direttamente host e viaggiatori. Con un modello di abbonamento per host, hanno democratizzato l'industria permettendo a chiunque di monetizzare i propri spazi.
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+150M</div>
                        <div className="stat-label">Utenti</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+220</div>
                        <div className="stat-label">Paesi</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                    <motion.div 
                  className="case-study-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="case-study-image">
                    <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" alt="Spotify Case Study" />
                    <div className="case-study-logo">
                      <img src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg" alt="Spotify logo" />
                    </div>
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">Spotify</div>
                    <div className="case-study-subtitle">Reinvenzione della musica</div>
                    <div className="case-study-desc">
                      Spotify ha rivoluzionato come consumiamo la musica, trasformando un mercato di acquisti singoli in un modello di abbonamento con accesso illimitato. Hanno utilizzato i dati degli utenti per creare esperienze personalizzate e playlist curate.
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+500M</div>
                        <div className="stat-label">Utenti attivi</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+200M</div>
                        <div className="stat-label">Abbonati premium</div>
                      </div>
                    </div>
                  </div>
                    </motion.div>
                
                <motion.div 
                  className="case-study-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="case-study-image">
                    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Uber Case Study" />
                    <div className="case-study-logo">
                      <img src="https://cdn.worldvectorlogo.com/logos/uber-15.svg" alt="Uber logo" />
                    </div>
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">Uber</div>
                    <div className="case-study-subtitle">Rivoluzione della mobilità urbana</div>
                    <div className="case-study-desc">
                      Uber ha trasformato il settore dei trasporti connettendo passeggeri e autisti attraverso un'app semplice. Il suo modello di abbonamento per driver ha sconvolto l'industria dei taxi tradizionali, creando un nuovo standard per la mobilità on-demand.
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+130M</div>
                        <div className="stat-label">Utenti attivi</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+10K</div>
                        <div className="stat-label">Città</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            
          </div>
        </section>

        {/* FAQ Section - Correzione errori linter */}
        <section className="business-faq">
          <div className="business-faq__content">
            <h2>{t('faqTitle')}</h2>
            <div className="business-faq__questions">
              {faqData.map((faq, index) => (
                <div key={index} className={`faq-question ${openFAQ === index ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
                  <div className="faq-question-header">
                    <h3>{faq.question}</h3>
                    <div className="faq-toggle">
                      {openFAQ === index ? <FiMinusCircle /> : <FiPlusCircle />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                        animate={{ height: 'auto', opacity: 1, paddingTop: '0', paddingBottom: '1.5rem' }}
                        exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <a href="/contact" className="button button--primary">{t('faqCta')}</a>
          </div>
        </section>

        {/* Final CTA Section */}
        <section ref={finalCtaRef} className="business-final-cta">
          <motion.div 
            className="business-final-cta__content"
            initial={{ opacity: 0, y: 30 }}
            animate={isFinalCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <h2>{t('businessFinalCtaTitle')}</h2>
            <p>{t('businessFinalCtaText')}</p>
            <motion.button 
              className="button button--primary"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isFinalCtaInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >{t('businessFinalCtaButton')}</motion.button>
            </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Business; 