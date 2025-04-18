import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './WhatIs.scss';

const WhatIs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Track when the section enters view for fade in effect
  const isInView = useInView(sectionRef, { 
    margin: "-10% 0px -10% 0px",
    once: false 
  });
  
  // Text content from translation
  const fullText = `${t('whatIsText')}`;
    
  // Split text into words
  const words = fullText.split(' ');
  
  // State to track how many words to show
  const [displayedWords, setDisplayedWords] = useState(0);
  
  // Effect to animate text writing when section is in view
  useEffect(() => {
    if (!isInView) {
      setDisplayedWords(0);
      return;
    }
    
    // If section is in view, start showing words one by one
    if (displayedWords < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(prev => prev + 1);
      }, 300); // Speed of word appearance
      
      return () => clearTimeout(timer);
    }
  }, [isInView, displayedWords, words.length]);

  return (
    <section id="what-is" className="what-is" ref={sectionRef}>
      <div className="what-is__container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">{t('whatIsABBSTitle')}</h2>
        </motion.div>

        <div className="what-is__content">
          <motion.div 
            className="text-container"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="text-content">
              <p className="animated-text">
                {words.slice(0, displayedWords).map((word, index) => (
                  <React.Fragment key={index}>
                    <motion.span
                      className="glowing-word"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {word}
                    </motion.span>
                    {' '}
                  </React.Fragment>
                ))}
                <span className="cursor"></span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;