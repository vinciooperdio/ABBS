import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { FiCheck, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import '../styles/pages/WaitingList.scss';

const WaitingList: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validazione
    if (!formData.name || !formData.email) {
      setError(t('missingFields'));
      return;
    }
    
    if (!formData.privacy) {
      setError(t('privacyRequired'));
      return;
    }
    
    // Simulazione invio form
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In un'applicazione reale, qui invieresti i dati a un server
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const features = [
    t('featureManageAll'),
    t('featureNotifications'),
    t('featureSaveTime'),
    t('featureDiscover'),
    t('featureExclusiveOffers')
  ];
  
  return (
    <>
      <Navbar />
      <main className="waitlist-page">
        <div className="waitlist-page__background"></div>
        <div className="container">
          <motion.div 
            className="waitlist-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="waitlist-content__text">
              <motion.h1 
                className="waitlist-title"
                variants={itemVariants}
              >
                {t('waitingListTitle')} <span className="text-gradient">ABBS</span>
              </motion.h1>
              
              <motion.p 
                className="waitlist-description"
                variants={itemVariants}
              >
                {t('waitingListDesc')}
              </motion.p>
              
              <motion.div 
                className="waitlist-features"
                variants={itemVariants}
              >
                <h3>{t('withABBSYouCan')}:</h3>
                <ul>
                  {features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <FiCheck className="feature-icon" /> {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              className="waitlist-form-container"
              variants={itemVariants}
            >
              {!isSubmitted ? (
                <div className="waitlist-form">
                  <h2>{t('waitingListTitle')}</h2>
                  <p>{t('fillFormBelow')}</p>
                  
                  {error && <div className="form-error">{error}</div>}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">
                        <FiUser /> {t('fullName')}
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder={t('yourName')}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">
                        <FiMail /> {t('email')}
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder={t('yourEmail')}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">
                        <FiMessageSquare /> {t('messageOptional')}
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder={t('tellUsAboutYou')}
                        rows={4}
                      />
                    </div>
                    
                    <div className="form-group checkbox">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        name="privacy" 
                        checked={formData.privacy} 
                        onChange={handleCheckboxChange} 
                        required
                      />
                      <label htmlFor="privacy">
                        {t('iHaveRead')} <a href="/privacy" target="_blank" rel="noopener noreferrer">{t('privacyPolicy')}</a>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      fullWidth
                      disabled={isLoading}
                    >
                      {isLoading ? t('sending') : t('subscribeNow')}
                    </Button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="success-icon">
                    <FiCheck />
                  </div>
                  <h2>{t('subscribeSuccess')}</h2>
                  <p>{t('requestReceived')}</p>
                  <p className="small">{t('followSocial')}</p>
                  <Button 
                    variant="secondary" 
                    href="/"
                  >
                    {t('backToHome')}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WaitingList; 