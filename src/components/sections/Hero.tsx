import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiChevronRight, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.scss';
import NebulaBackground from '../ui/NebulaBackground';

// High-resolution style for screens larger than 2K
const highResStyle: { marginTop: string | number } = {
  marginTop: 0 // Default value
};

// Update styles based on screen resolution
const updateHighResStyles = () => {
  if (window.innerWidth >= 2560) { // 2K and above
    highResStyle.marginTop = '10vh'; // Push content down for high-resolution screens
  } else {
    highResStyle.marginTop = 0;
  }
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Preload the Business page hero video
  useEffect(() => {
    // Preload video when component mounts
    const preloadVideo = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://cdn.abbs.one/videos/hero2.mp4';
      link.as = 'video';
      link.type = 'video/mp4';
      document.head.appendChild(link);

      // Alternative method - create and load video element
      const video = document.createElement('video');
      video.style.display = 'none';
      video.preload = 'auto';
      video.src = 'https://cdn.abbs.one/videos/hero2.mp4';
      document.body.appendChild(video);
      
      // Remove hidden video element after it's loaded
      video.onloadeddata = () => {
        document.body.removeChild(video);
      };
    };

    preloadVideo();
  }, []);

  // Update high-res styles and add resize listener
  useEffect(() => {
    updateHighResStyles();
    window.addEventListener('resize', updateHighResStyles);
    
    return () => {
      window.removeEventListener('resize', updateHighResStyles);
    };
  }, []);

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setError(t('invalidEmail'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Usa l'API del backend per salvare l'email
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'Email already registered') {
          setError(t('emailAlreadyRegistered'));
        } else {
          setError(t('errorMessage') || 'Something went wrong');
        }
        setIsLoading(false);
        return;
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(t('errorMessage') || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const successItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const iconAnimationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <>
      {/* Loading screen */}
      <div className={`loading-screen ${loadingComplete ? 'hidden' : ''}`}>
        <h1 className="logo-text">ABBS</h1>
      </div>

      <section className="hero" ref={sectionRef} id="waitlist">
        <NebulaBackground />
        
        <div className="hero__container">
          <div className="hero__left-column">
            <motion.div
              className="hero__content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: loadingComplete ? 0.2 : 3.2
              }}
              style={{ marginTop: highResStyle.marginTop }}
            >
              <motion.h1 
                className="hero__heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: loadingComplete ? 0.4 : 3.4,
                  ease: "easeOut"
                }}
              >
                {t('revolutionIsHere').split(' ').map((word, i, arr) => 
                  i === 1 ? <span key={i}><span className="gradient-text">{word}</span>{i < arr.length - 1 ? ' ' : ''}</span> : 
                  <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
                )}
              </motion.h1>
              
              <motion.p 
                className="hero__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: loadingComplete ? 0.6 : 3.6,
                  ease: "easeOut"
                }}
              >
                {t('manageAllSubscriptions')}
              </motion.p>

              <div className="waiting-list__wrapper">
                <motion.h4 
                  className="waiting-list__heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: loadingComplete ? 0.7 : 3.7, ease: "easeOut" }}
                >
                  {t('joinWaitlist')}
                </motion.h4>
                
                {!submitted ? (
                  <motion.form 
                    className="waiting-list__form"
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.input 
                      type="email" 
                      placeholder={t('yourEmail')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label={t('yourEmail')}
                      variants={itemVariants}
                    />
                    <motion.button 
                      type="submit" 
                      disabled={isLoading}
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial="rest"
                    >
                      {isLoading ? t('submitting') : t('subscribe')} <FiChevronRight />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="waiting-list__success-message"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={iconAnimationVariants}><FiCheck className="success-icon" /></motion.div>
                    <motion.p variants={successItemVariants}>{t('thankYouForSubscribing')}</motion.p>
                    <motion.button 
                      onClick={handleReset} 
                      className="waiting-list__reset-button"
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial="rest"
                    >
                      {t('subscribeAgain')}
                    </motion.button>
                  </motion.div>
                )}
                
                {error && <motion.p className="waiting-list__error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
                
                <motion.p 
                  className="waiting-list__privacy-policy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: loadingComplete ? 0.8 : 3.8, ease: "easeOut" }}
                >
                  {t('bySubscribing')} <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">{t('privacyPolicy')}</a>.
                </motion.p>
              </div>
            </motion.div>
          </div>
          <div className="hero__right-column">
            {/* Placeholder for iPhone 16 Pro mockup */}
            <img src="/iphone.png" alt="iPhone 16 Pro Mockup" className="hero__iphone-mockup" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;