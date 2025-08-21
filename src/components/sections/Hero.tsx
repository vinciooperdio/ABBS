import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.scss';
import NebulaBackground from '../ui/NebulaBackground';

const Hero: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError(t('invalidEmail'));
      return;
    }
    
    setIsLoading(true);
    
    try {
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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const successVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const successItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
      <div className={`loading-screen ${loadingComplete ? 'hidden' : ''}`}>
        <h1 className="logo-text">ABBS</h1>
      </div>

      <section className="hero" id="waitlist">
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
                  {t('waitingListTitle')}
                </motion.h4>

                {!submitted ? (
                  <motion.form 
                    className="waiting-list__form"
                    onSubmit={handleSubmit}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('yourEmail')}
                      disabled={isLoading}
                      required
                    />
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? t('subscribing') : t('subscribe')}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="waiting-list__success-message"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={iconAnimationVariants}><FiCheck className="success-icon" /></motion.div>
                    <motion.p variants={successItemVariants}>{t('subscribeSuccess')}</motion.p>
                    <motion.button 
                      onClick={handleReset} 
                      className="waiting-list__reset-button"
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial="rest"
                    >
                      {t('subscribeAnother')}
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
                  Iscrivendoti, accetti la nostra <a href="https://abbs.one/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </motion.p>
              </div>
            </motion.div>
          </div>
          <div className="hero__right-column">
            <img src="/iphone.png" alt="iPhone 16 Pro Mockup" className="hero__iphone-mockup" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;