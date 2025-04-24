import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue, AnimatePresence } from 'framer-motion';
import { FiClock, FiBarChart2, FiDollarSign, FiXCircle, FiCheck, FiAlertCircle, FiArrowRight, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { FaChartLine, FaBolt, FaChartBar, FaLock, FaRandom, FaCheckCircle, FaCogs, FaFileInvoiceDollar, FaGlobe, FaHandshake, FaMoneyBillWave, FaRocket, FaShieldAlt, FaSyncAlt, FaTable, FaThumbsUp, FaTimesCircle, FaUsersCog, FaBullseye, FaStore, FaCreditCard, FaBell, FaDoorOpen, FaCoins } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SectionBackground from '../components/ui/SectionBackground';
import NebulaBackground from '../components/ui/NebulaBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/ui/Navbar';
import '../styles/Business.scss';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import abbsLogo from '../assets/images/abbslogo.svg';
import dashboard from '../assets/images/dashboard.jpeg'



const Business: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Global scroll progress
  const { scrollY } = useScroll();
  
  // InView states for sections
  const isHowItWorksInView = useInView(howItWorksRef, { once: false, amount: 0.3 });
  const isMarketingInView = useInView(marketingRef, { once: false, amount: 0.3 });
  
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
      
      const heroHeight = heroRef.current?.offsetHeight || 0;
      
      // Calculate the start position of each section
      const heroEnd = heroHeight * 0.5;
      
      
      // Determine active section and video
      if (scrollPosition < heroEnd) {
        setSectionIndex(0); // Hero section
        setActiveVideoIndex(0); // Hero video
      
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
  
  
  
 

  
  
  
  
  // Video sources
  const videoSources = [
    "https://cdn.abbs.one/videos/hero2.mp4"
  ];

  // Assumi che i dati FAQ siano definiti altrove, ad esempio:
  const faqData = [
    { question: t('businessFaq1'), answer: t('businessFaq1Answer') },
    { question: t('businessFaq2'), answer: t('businessFaq2Answer') },
    { question: t('businessFaq3'), answer: t('businessFaq3Answer') },
    { question: t('businessFaq4'), answer: t('businessFaq4Answer') },
    { question: t('businessFaq5'), answer: t('businessFaq5Answer') },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="business-page">
      <SEO
        title={`ABBS Business | ${language === 'it' ? 'Gestione Abbonamenti per Aziende e Professionisti' : 'Subscription Management for Businesses'}`}
        description={language === 'it' ? 
          "ABBS Business offre una soluzione completa per la gestione degli abbonamenti aziendali. Centralizza, ottimizza e risparmia sui costi con la nostra piattaforma intuitiva per gestire abbonamenti professionali." : 
          "ABBS Business offers a complete solution for managing business subscriptions. Centralize, optimize and save costs with our intuitive platform."}
        keywords={language === 'it' ? 
          "abbonamenti aziendali, gestione abbonamenti business, software abbonamenti, piattaforma abbonamenti professionali, risparmio abbonamenti" : 
          "business subscriptions, subscription management software, enterprise subscription platform"}
        article={true}
        pathname="/business"
      />

      

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
              <button 
                className="button button--primary"
                onClick={() => {
                  document.querySelector('.business-contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('businessHeroCta1')}
              </button>
            </div>
          </motion.div>
        </section>

        

        {/* Benefits Section */}
        <section className="business-benefits" ref={benefitsRef} id="benefits">
          <div className="business-benefits__content">
            <h2 className="text-gradient" style={{ textAlign: 'center' }}>{t('benefits')}</h2>
            <p style={{ textAlign: 'center' }}>{t('benefitsDesc')}</p>

            <div className="business-benefits__wrapper">
              {/* Vantaggio 1: Crescita clientela con Lottie */}
              <div className="business-benefits__item">
                <div className="business-benefits__item-visual" style={{ width: '100%', maxWidth: '100%' }}>
                  <div className="lottie-container responsive-lottie">
                    <DotLottieReact
                      src="https://lottie.host/d9431f48-a2bf-44d3-b5d7-ca25f00e361e/JUl00A2KlR.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className="business-benefits__item-content">
                  <h3>{t('espandi')}</h3>
                  <p>{t('espandiDesc')}</p>
                  
                </div>
              </div>

              {/* Vantaggio 2: Personalizzazione con Lottie */}
              <div className="business-benefits__item">
                <div className="business-benefits__item-visual" style={{ width: '100%', maxWidth: '100%' }}>
                  <div className="lottie-container responsive-lottie">
                    <DotLottieReact
                      src="https://lottie.host/9d437f68-4d75-44cc-a84e-c4a488679b93/uhBUUbzDKv.lottie"
                      loop
                      autoplay
                    />
                  </div>
                  
                </div>
                <div className="business-benefits__item-content">
                  <h3>{t('personalizzazione')}</h3>
                  <p>{t('personalizzazioneDesc')}</p>
                  
                </div>
              </div>
              
              {/* Vantaggio 3: Automazione con Lottie */}
              <div className="business-benefits__item">
                <div className="business-benefits__item-visual" style={{ width: '100%', maxWidth: '100%'}}>
                  <div className="lottie-container responsive-lottie">
                    <DotLottieReact
                      src="https://lottie.host/43f575ca-7b59-4a1a-8e53-290318bb7c92/LxXvSdCgY3.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className="business-benefits__item-content">
                  <h3>{t('automazione')}</h3>
                  <p>{t('automazioneDesc')}</p>
                  
                </div>
              </div>
              
              {/* Vantaggio 4: Pricing Intelligente con Lottie */}
              <div className="business-benefits__item" >
                <div className="business-benefits__item-visual" style={{ width: '100%', maxWidth: '100%' }}>
                  <div className="lottie-container responsive-lottie">
                    <DotLottieReact
                      src="https://lottie.host/3c5d21a9-1631-46e4-9597-a9b23248c081/q0xF5l9VR3.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className="business-benefits__item-content">
                  <h3>{t('pricing')}</h3>
                  <p>{t('pricingDesc')}</p>
                  
                </div>
              </div>
              
              {/* Vantaggio 5: Sicurezza con Lottie */}
              <div className="business-benefits__item" >
                <div className="business-benefits__item-visual" style={{ width: '100%', maxWidth: '100%' }}>
                  <div className="lottie-container responsive-lottie">
                    <DotLottieReact
                      src="https://lottie.host/4f269155-7080-45d9-9a4a-b183375b9ad7/6Q7uiaitdO.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className="business-benefits__item-content">
                  <h3>{t('sicurezza')}</h3>
                  <p>{t('sicurezzaDesc')}</p>
                </div>
              </div>
            </div>

            {/* CTA generale */}
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button 
              className="button button--primary"
                onClick={() => {
                  document.querySelector('.business-contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('businessBenefitsCta')}
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section - Più Giocosa */}
        <section ref={howItWorksRef} className="business-how-it-works" id="how-it-works">
          <motion.div 
            className="business-how-it-works__content"
            initial={{ opacity: 0, y: 50 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-gradient">{t('businessHowItWorksTitle')}</h2>
            <div className="business-how-it-works__interactive">
              <div className="tablet-mockup">
                <div className="tablet-screen">
                  <img className="dashboard-image" src={dashboard} alt="ABBS Business Dashboard" />
                </div>
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
                  <h3 className="step-title">{t('businessStep1')}</h3>
                  <p>{t('businessStep1Desc')}</p>
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
                  <h3 className="step-title">{t('businessStep2')}</h3>
                  <p>{t('businessStep2Desc')}</p>
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
                  <h3 className="step-title">{t('businessStep3')}</h3>
                  <p>{t('businessStep3Desc')}</p>
                </div>
              </motion.div>
            </div>
            <motion.button 
              className="button button--primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => {
                document.querySelector('.business-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('businessHowItWorksCta')}
            </motion.button>
          </motion.div>
        </section>

        {/* Marketing Section - ULTRA WOW */}
        <section ref={marketingRef} className="business-marketing" id="marketing">
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
                {t('caseStudiesTitle')}
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
                    
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">{t('airbnbName')}</div>
                    <div className="case-study-subtitle">{t('airbnbSubtitle')}</div>
                    <div className="case-study-desc">
                      {t('airbnbDesc')}
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+150M</div>
                        <div className="stat-label">{t('users')}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+220</div>
                        <div className="stat-label">{t('countries')}</div>
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
                    <img src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22026912/acastro_201110_4286_spotify_0001.jpg?quality=90&strip=all&crop=0%2C0%2C100%2C100&w=1080" alt="Spotify Case Study" />
                    
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">{t('spotifyName')}</div>
                    <div className="case-study-subtitle">{t('spotifySubtitle')}</div>
                    <div className="case-study-desc">
                      {t('spotifyDesc')}
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+500M</div>
                        <div className="stat-label">{t('activeUsers')}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+200M</div>
                        <div className="stat-label">{t('premiumSubscribers')}</div>
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
                    <img src="https://assets.turbologo.com/blog/es/2019/12/19132829/Uber-car.png" alt="Uber Case Study" />
                    
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-name">{t('uberName')}</div>
                    <div className="case-study-subtitle">{t('uberSubtitle')}</div>
                    <div className="case-study-desc">
                      {t('uberDesc')}
                    </div>
                    <div className="case-study-stats">
                      <div className="stat">
                        <div className="stat-value">+130M</div>
                        <div className="stat-label">{t('activeUsers')}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">+10K</div>
                        <div className="stat-label">{t('cities')}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            
          </div>
        </section>

        {/* FAQ Section */}
        <section className="business-faq" ref={faqRef} id="faq">
          <div className="business-faq__content">
            <h2>{t('businessFaqTitle')}</h2>
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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ marginBottom: '1.5rem' }}>{t('businessFaqPreCta')}</p>
              
            </div>
          </div>
        </section>

        

        {/* Contact Form Section */}
        <section className="business-contact" id="contact">
          <div className="business-contact__container">
            <h2 className="text-gradient">{t('businessFaqCta')}</h2>
            <p>{t('businessContact')}</p>
            
            <form 
              className="business-contact__form"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  company: formData.get('company'),
                  message: formData.get('message')
                };
                
                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  
                  if (response.ok) {
                    alert('Grazie per il tuo messaggio! Ti contatteremo presto.');
                    form.reset();
                  } else {
                    alert('Si è verificato un errore. Riprova più tardi.');
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Si è verificato un errore. Riprova più tardi.');
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="name">{t('businessContactName')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder={t('businessContactNamePlaceholder')} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('businessContactEmail')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder={t('businessContactEmailPlaceholder')} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">{t('businessContactAzienda')}</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder={t('businessContactAziendaPlaceholder')} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('businessContactMessage')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder={t('businessContactMessagePlaceholder')} 
                  rows={4} 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                {t('businessContactSubmit')}
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Business; 