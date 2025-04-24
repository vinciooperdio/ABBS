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
  const paragraphs = t('whatIsText').split('\n');
  
  // Creare una struttura per i paragrafi e le loro parole
  const paraWords = paragraphs.map(para => ({
    text: para,
    words: para.split(' ')
  }));
  
  // Calcola il numero totale di parole
  const totalWords = paraWords.reduce((acc, para) => acc + para.words.length, 0);
  
  // State to track how many words to show
  const [displayedWords, setDisplayedWords] = useState(0);
  
  // Effect to animate text writing when section is in view
  useEffect(() => {
    if (!isInView) {
      setDisplayedWords(0);
      return;
    }
    
    // If section is in view, start showing words one by one
    if (displayedWords < totalWords) {
      const timer = setTimeout(() => {
        setDisplayedWords(prev => prev + 1);
      }, 200); // Speed of word appearance
      
      return () => clearTimeout(timer);
    }
  }, [isInView, displayedWords, totalWords]);
  
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
              {paraWords.map((paragraph, pIndex) => {
                // Calcola il numero di parole prima di questo paragrafo
                const wordsBefore = paraWords
                  .slice(0, pIndex)
                  .reduce((acc, p) => acc + p.words.length, 0);
                
                // Quante parole di questo paragrafo mostrare
                const wordsToShow = Math.max(0, Math.min(
                  paragraph.words.length, 
                  displayedWords - wordsBefore
                ));
                
                // Mostra il paragrafo solo se almeno una parola è visibile
                if (wordsToShow <= 0 && displayedWords < totalWords) {
                  return null;
                }
                
                // Ottieni il testo parziale
                const visibleText = paragraph.words.slice(0, wordsToShow).join(' ');
                
                return (
                  <p key={pIndex} className="animated-text paragraph">
                    {formatWithBold(visibleText)}
                    {/* Aggiungi il cursore solo all'ultimo paragrafo visibile */}
                    {displayedWords < totalWords && 
                     wordsBefore + wordsToShow === displayedWords && 
                     <span className="cursor"></span>}
                  </p>
                );
              })}
              {/* Cursore finale quando tutta l'animazione è completa */}
              {displayedWords >= totalWords && <span className="cursor"></span>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;