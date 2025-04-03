import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageToggle.scss';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <motion.div 
      className="language-toggle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button 
        className="language-toggle__button" 
        onClick={toggleLanguage}
        aria-label={t('language')}
      >
        <span className={`language-toggle__option ${language === 'it' ? 'language-toggle__option--active' : ''}`}>
          IT
        </span>
        <span className="language-toggle__separator">|</span>
        <span className={`language-toggle__option ${language === 'en' ? 'language-toggle__option--active' : ''}`}>
          EN
        </span>
      </button>
    </motion.div>
  );
};

export default LanguageToggle; 