import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue, AnimatePresence } from 'framer-motion';
import { FiClock, FiBarChart2, FiDollarSign, FiXCircle, FiCheck, FiAlertCircle, FiArrowRight, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
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
      
      // Determine active section and video
      if (scrollPosition < heroEnd) {
        setSectionIndex(0); // Hero section
        setActiveVideoIndex(0); // Hero video
      } else if (scrollPosition >= problem1Start && scrollPosition < problem1End) {
        setSectionIndex(1); // Problem 1
        setActiveVideoIndex(1); // Problems video
      } else if (scrollPosition >= problem2Start && scrollPosition < problem2End) {
        setSectionIndex(2); // Problem 2
        setActiveVideoIndex(1); // Problems video
      } else if (scrollPosition >= problem3Start && scrollPosition < problem3End) {
        setSectionIndex(3); // Problem 3
        setActiveVideoIndex(1); // Problems video
      } else if (scrollPosition >= problem4Start && scrollPosition < problem4End) {
        setSectionIndex(4); // Problem 4
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
      icon: "💸",
      title: "Costi nascosti e abbonamenti dimenticati",
      description: "Le aziende perdono migliaia di euro ogni anno per abbonamenti dimenticati o non utilizzati che continuano a rinnovarsi automaticamente.",
      opacity: getProblemOpacity(1),
      y: getProblemY(1)
    },
    {
      icon: "🔍",
      title: "Difficoltà nel tracciare tutti gli abbonamenti",
      description: "È impossibile tenere traccia manualmente di decine di servizi con date di rinnovo diverse e condizioni contrattuali complesse.",
      opacity: getProblemOpacity(2),
      y: getProblemY(2)
    },
    {
      icon: "⚠️",
      title: "Rinnovi indesiderati e sorprese in fattura",
      description: "Scoprire abbonamenti rinnovati automaticamente solo quando è troppo tardi comporta costi non pianificati e spreco di risorse.",
      opacity: getProblemOpacity(3),
      y: getProblemY(3)
    },
    {
      icon: "📉",
      title: "Mancanza di visibilità sulla spesa complessiva",
      description: "Senza una visione completa degli abbonamenti aziendali, è impossibile ottimizzare i costi e prendere decisioni informate sui servizi da mantenere.",
      opacity: getProblemOpacity(4),
      y: getProblemY(4),
      hasCta: true
    }
  ];

  // Data for benefits section
  const benefits = [
    {
      icon: <FaRocket />,
      title: t('businessBenefit1'),
      description: t('businessBenefit1Desc')
    },
    {
      icon: <FaChartLine />,
      title: t('businessBenefit2'),
      description: t('businessBenefit2Desc')
    },
    {
      icon: <FaShieldAlt />,
      title: t('businessBenefit3'),
      description: t('businessBenefit3Desc')
    },
    {
      icon: <FaSyncAlt />,
      title: t('businessBenefit4'),
      description: t('businessBenefit4Desc')
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
    "https://videocdn.cdnpk.net/videos/04aafdf0-4047-4e5f-a3df-298036511ffc/horizontal/previews/clear/large.mp4?token=exp=1743688078~hmac=49142a2312f98bff730724a99ffec50bf7ba87ea23c2928e750045356fc8cdf4",
    "https://videocdn.cdnpk.net/videos/f1d5c144-e30e-535d-b827-d80c3d69921d/horizontal/previews/clear/large.mp4?token=exp=1743687863~hmac=c4a1b5469221a03295dd39883db83d9a68c33cf8abc7f3fccb8854907fb0f037",
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
                className="problem-item"
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
        <section ref={benefitsRef} className="business-benefits">
          <NebulaBackground />
          <motion.div 
            className="business-benefits__content"
            initial={{ opacity: 0, y: 50 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-gradient">{t('businessBenefitsTitle')}</h2>
            <p>{t('businessBenefitsText')}</p>
            <div className="business-benefits__grid">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="benefit-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  <div className="benefit-arrow">
                    <FiArrowRight />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button 
              className="button button--primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >{t('businessBenefitsCta')}</motion.button>
          </motion.div>
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
                    <h3 className="step-title">Registrazione Super Semplice</h3>
                    <p>Niente moduli complicati, bastano email e password per iniziare subito. Ti guidiamo passo passo!</p>
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
                    <h3 className="step-title">Importazione Automatica</h3>
                    <p>ABBS trova automaticamente i tuoi abbonamenti scansionando email o collegando account. Zero inserimento manuale!</p>
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
                    <h3 className="step-title">Risparmio Immediato</h3>
                    <p>Identifichiamo abbonamenti inutilizzati e duplicati. Media di risparmio: 30% sui costi di abbonamento annuali!</p>
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
              <p>{t('businessMarketingIntro')}</p>
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
            
            <motion.div 
              className="business-marketing__stats-container"
              initial={{ opacity: 0 }}
              animate={isMarketingInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="stats-grid">
                {marketingStats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="stat-item"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isMarketingInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                  >
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="business-marketing__interactive-demo"
              initial={{ opacity: 0, y: 30 }}
              animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <div className="dashboard-sequence">
                <div className="dashboard-container">
                  <div className="dashboard-header">
                    <div className="dashboard-logo">ABBS</div>
                    <div className="dashboard-actions">
                      <span className="dashboard-action active">Dashboard</span>
                      <span className="dashboard-action">Insights</span>
                      <span className="dashboard-action">Settings</span>
                    </div>
                  </div>
                  
                  <div className="dashboard-body">
                    <div className="dashboard-metrics">
                      <div className="metric-card primary">
                        <div className="metric-title">Subscription Value</div>
                        <div className="metric-value">€24,500</div>
                        <div className="metric-change positive">+16.8%</div>
                      </div>
                      
                      <div className="metric-card">
                        <div className="metric-title">Active Subscriptions</div>
                        <div className="metric-value">68</div>
                        <div className="metric-change positive">+4</div>
                      </div>
                      
                      <div className="metric-card">
                        <div className="metric-title">Renewal Rate</div>
                        <div className="metric-value">94.2%</div>
                        <div className="metric-change positive">+2.3%</div>
                      </div>
                    </div>
                    
                    <div className="dashboard-visualization">
                      <div className="visualization-header">
                        <h3>Subscription Growth</h3>
                        <div className="time-selector">
                          <span>Monthly</span>
                          <span className="active">Quarterly</span>
                          <span>Yearly</span>
                        </div>
                      </div>
                      
                      <div className="chart-container">
                        <div className="chart-axis"></div>
                        <div className="chart-bars">
                          <motion.div 
                            className="chart-bar" 
                            initial={{ height: '0%' }}
                            animate={isMarketingInView ? { height: '65%' } : { height: '0%' }}
                            transition={{ duration: 0.7, delay: 1.3 }}
                          ></motion.div>
                          <motion.div 
                            className="chart-bar" 
                            initial={{ height: '0%' }}
                            animate={isMarketingInView ? { height: '45%' } : { height: '0%' }}
                            transition={{ duration: 0.7, delay: 1.4 }}
                          ></motion.div>
                          <motion.div 
                            className="chart-bar" 
                            initial={{ height: '0%' }}
                            animate={isMarketingInView ? { height: '75%' } : { height: '0%' }}
                            transition={{ duration: 0.7, delay: 1.5 }}
                          ></motion.div>
                          <motion.div 
                            className="chart-bar" 
                            initial={{ height: '0%' }}
                            animate={isMarketingInView ? { height: '60%' } : { height: '0%' }}
                            transition={{ duration: 0.7, delay: 1.6 }}
                          ></motion.div>
                          <motion.div 
                            className="chart-bar active" 
                            initial={{ height: '0%' }}
                            animate={isMarketingInView ? { height: '85%' } : { height: '0%' }}
                            transition={{ duration: 0.7, delay: 1.7 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dashboard-features">
                      <div className="feature-card">
                        <div className="feature-icon automation"></div>
                        <div className="feature-title">Auto-Renewal</div>
                      </div>
                      <div className="feature-card">
                        <div className="feature-icon analytics"></div>
                        <div className="feature-title">Cost Analysis</div>
                      </div>
                      <div className="feature-card">
                        <div className="feature-icon security"></div>
                        <div className="feature-title">Secure Vault</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="interactive-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={isMarketingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <button className="button button--primary">{t('businessMarketingCta')}</button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="business-faq">
          <motion.div 
            className="business-faq__content"
            initial={{ opacity: 0, y: 50 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-gradient">{t('businessFaqTitle')}</h2>
            <div className="business-faq__questions">
              <FAQ 
                question={t('businessFaq1')}
                answer="ABBS offre un periodo di prova gratuito di 30 giorni con tutte le funzionalità, senza necessità di carta di credito. Dopo la prova, puoi scegliere tra diversi piani in base alle dimensioni della tua azienda e alle tue esigenze specifiche."
                delay={0}
                inView={isFaqInView}
              />
              <FAQ 
                question={t('businessFaq2')}
                answer="Assolutamente sì! ABBS è progettato per essere utilizzato da aziende di qualsiasi dimensione. Abbiamo clienti che vanno da piccole startup a grandi aziende con centinaia di abbonamenti. I nostri piani si adattano alle tue esigenze specifiche."
                delay={0.1}
                inView={isFaqInView}
              />
              <FAQ 
                question={t('businessFaq3')}
                answer="L'integrazione è semplice e veloce. ABBS può importare automaticamente i dati dalle tue email, sistemi di fatturazione o file CSV. Offriamo anche assistenza dedicata durante l'onboarding per assicurarci che tutto funzioni perfettamente."
                delay={0.2}
                inView={isFaqInView}
              />
              <FAQ 
                question="È sicuro condividere i dati dei nostri abbonamenti?"
                answer="La sicurezza dei tuoi dati è la nostra priorità assoluta. ABBS utilizza crittografia di livello bancario, è conforme al GDPR e non memorizza informazioni sensibili come password o dettagli completi delle carte di credito. Puoi leggere la nostra politica sulla privacy per tutti i dettagli."
                delay={0.3}
                inView={isFaqInView}
              />
              <FAQ 
                question="Quanto tempo richiede l'implementazione?"
                answer="La maggior parte dei nostri clienti è operativa entro 24-48 ore dall'iscrizione. Il sistema inizia immediatamente a rilevare i tuoi abbonamenti e puoi iniziare a vedere risultati e risparmi fin dal primo giorno."
                delay={0.4}
                inView={isFaqInView}
              />
            </div>
            <motion.button 
              className="button button--primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >{t('businessFaqCta')}</motion.button>
          </motion.div>
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

// Componente FAQ con espansione
const FAQ: React.FC<{
  question: string;
  answer: string;
  delay: number;
  inView: boolean;
}> = ({ question, answer, delay, inView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className={`faq-question ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-question-header">
        <h3>{question}</h3>
        <div className="faq-toggle">
          {isOpen ? <FiMinusCircle /> : <FiPlusCircle />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Business; 