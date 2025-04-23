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
  
  // Divide il testo in paragrafi usando \n come delimitatore
  const paragraphs = t('whatIsText').split('\\n');
  
  // Funzione per gestire i grassetti tra asterischi
  const formatWithBold = (text: string) => {
    // Cerca pattern **testo** e lo sostituisce con tag strong
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Rimuove gli asterischi e applica il tag strong
        const boldText = part.substring(2, part.length - 2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };
  
  // State to track animation progress
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Effect to trigger animation when in view
  useEffect(() => {
    if (!isInView) {
      setAnimationComplete(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isInView]);

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
              {paragraphs.map((paragraph, pIndex) => (
                <motion.p 
                  key={pIndex}
                  className="animated-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.2 + (pIndex * 0.1) }}
                >
                  {formatWithBold(paragraph)}
                </motion.p>
              ))}
              {animationComplete && <span className="cursor"></span>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;