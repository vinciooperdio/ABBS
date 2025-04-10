import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiChevronRight, FiCheck, FiX } from 'react-icons/fi';
import SectionBackground from '../ui/SectionBackground';
import Lottie from 'lottie-react';
import waitingListAnimation from '../../assets/animations/waiting-list.json';
import { useLanguage } from '../../context/LanguageContext';
import './WaitingList.scss';

const WaitingList = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showLottie, setShowLottie] = useState(false);
  
  // Track scroll position for animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Check if section is in view
  const isInView = useInView(sectionRef, { 
    margin: "-20% 0px -20% 0px",
    once: false
  });
  
  // Effect to handle section visibility
  useEffect(() => {
    if (isInView) {
      setShowLottie(true);
    }
  }, [isInView]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('invalidEmail'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Il form di Netlify gestirà la submission automaticamente
    // Lo stato viene comunque aggiornato per l'UX
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 500);
  };
  
  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
  };
  
  // Scroll-based animations
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [50, 0, 0, 50]
  );
  
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        delay: 0.2
      } 
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };
  
  const successItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // Badge hover effect
  const badgeHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };
  
  // Button hover effect
  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px rgba(75, 69, 206, 0.25)"
    },
    tap: { scale: 0.97 }
  };
  
  // Icon animations
  const iconAnimationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  return (
    <SectionBackground variant="secondary" id="waiting-list" className="waiting-list">
      {showLottie && (
        <motion.div 
          className="waiting-list__lottie-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Lottie
            animationData={waitingListAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      )}
      <div ref={sectionRef} className="waiting-list__container">
        <motion.div 
          className="waiting-list__content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="waiting-list__title"
            style={{
              y: titleY,
              opacity: titleOpacity
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('waitingListTitle')} <br />
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="waiting-list__subtitle"
            variants={itemVariants}
          >
            {t('waitingListDesc')}
          </motion.p>

          <motion.div 
            className="waiting-list__form-container"
            variants={itemVariants}
          >
            {!submitted ? (
              <motion.form 
                onSubmit={handleSubmit} 
                className="waiting-list__form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                data-netlify="true"
                name="waiting-list"
                method="POST"
                netlify-honeypot="bot-field"
              >
                {/* Campi richiesti da Netlify Forms */}
                <input type="hidden" name="form-name" value="waiting-list" />
                <div hidden>
                  <input name="bot-field" />
                </div>
                
                <div className="waiting-list__input-group">
                  <motion.input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('yourEmail')}
                    className={`waiting-list__input ${error ? 'waiting-list__input--error' : ''}`}
                    disabled={isLoading}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                  <motion.button 
                    type="submit" 
                    className="waiting-list__submit"
                    disabled={isLoading}
                    variants={buttonHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {isLoading ? (
                      <span className="waiting-list__spinner"></span>
                    ) : (
                      <>
                        <span>{t('subscribe')}</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            ease: "easeInOut",
                            repeatType: "reverse"
                          }}
                        >
                          <FiChevronRight />
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </div>
                {error && (
                  <motion.p 
                    className="waiting-list__error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.p>
                )}
                <motion.p 
                  className="waiting-list__disclaimer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {t('privacyConsent')}
                </motion.p>
              </motion.form>
            ) : (
              <motion.div 
                className="waiting-list__success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="waiting-list__success-icon"
                  variants={iconAnimationVariants}
                >
                  <FiCheck />
                </motion.div>
                <motion.h3 variants={successItemVariants}>
                  {t('subscribeSuccess')}
                </motion.h3>
                <motion.p variants={successItemVariants}>
                  {t('subscribeSuccessMessage')}
                </motion.p>
                <motion.button 
                  onClick={handleReset}
                  className="waiting-list__reset"
                  variants={successItemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('subscribeAnother')}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            custom={3}
            className="waiting-list__counter"
          >
            <motion.div 
              className="waiting-list__counter-value"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              3482
            </motion.div>
            <motion.div 
              className="waiting-list__counter-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {t('subscriptionCount')}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SectionBackground>
  );
};

export default WaitingList; 