import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './WhatIs.scss';

const WhatIs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  
  // Track when the section enters view for fade in effect
  const isInView = useInView(sectionRef, { 
    margin: "-40% 0px -40% 0px", // Increased margin for earlier detection
    once: false 
  });
  
  // Track scroll position within section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create transforms for various effects - Faster transition at the end
  const videoOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.15, 0.2, 0.7, 0.8, 0.9], 
    [0, 0, 0.5, 1, 1, 1, 0]
  );
  
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.7, 0.8, 0.9],
    [1.1, 1.1, 1, 1, 1.1, 1.1]
  );
  
  const videoBlur = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.7, 0.8, 0.9],
    ["8px", "8px", "0px", "0px", "8px", "8px"]
  );

  // Title opacity control - faster fade out
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  const textPhrases = [
    t('whatIsPhrase1'),
    t('whatIsPhrase2'),
    t('whatIsPhrase3'),
    t('whatIsPhrase4'),
    t('whatIsPhrase5'),
    t('whatIsPhrase6'),
    t('whatIsPhrase7')
  ];

  // Opacity e Y transform per i problemi
  const [problems, setProblems] = useState(textPhrases.map(() => ({
    opacity: 0,
    y: 50
  })));

  // Gestiamo l'animazione dei problemi in base allo scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionStart = top;
      const sectionHeight = height;
      const viewableHeight = windowHeight * 0.8; // Percentuale visibile della sezione
      const scrollRange = sectionHeight - viewableHeight;
      
      // Calcoliamo quanta parte abbiamo scrollato nella sezione
      const scrolled = Math.max(0, Math.min(1, -sectionStart / scrollRange));
      
      // Numero di problemi
      const numProblems = textPhrases.length+1;
      
      // Quanto spazio occupa ogni problema nel range di scroll
      const problemScrollSpace = 1 / numProblems;
      
      // Aggiorniamo le opacità e posizioni di ogni problema
      const newProblems = textPhrases.map((_, index) => {
        // Inizio e fine del range di scroll per questo problema
        const startScroll = index * problemScrollSpace;
        const endScroll = (index + 1) * problemScrollSpace;
        
        // Fade in/out
        let opacity = 0;
        if (scrolled >= startScroll && scrolled < endScroll) {
          // Fade in durante la prima metà dello spazio del problema
          const fadeInPoint = startScroll + (problemScrollSpace * 0.2);
          const fadeOutPoint = endScroll - (problemScrollSpace * 0.2);
          
          if (scrolled < fadeInPoint) {
            opacity = (scrolled - startScroll) / (fadeInPoint - startScroll);
          } else if (scrolled > fadeOutPoint) {
            opacity = 1 - ((scrolled - fadeOutPoint) / (endScroll - fadeOutPoint));
          } else {
            opacity = 1;
          }
        }
        
        // Y position - movimento verso l'alto quando esce
        let y = 50;
        if (scrolled >= startScroll && scrolled < endScroll) {
          y = 0;
        } else if (scrolled >= endScroll) {
          y = -50;
        }
        
        return { opacity, y };
      });
      
      setProblems(newProblems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Invoca all'inizio per impostare i valori iniziali
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [textPhrases.length]);

  // Play/pause video based on visibility
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section id="what-is" className="what-is" ref={sectionRef}>
      <motion.div 
        className="video-container"
        style={{ 
          opacity: videoOpacity,
        }}
      >
        <motion.div 
          className="video-wrapper"
          style={{
            scale: videoScale,
            filter: `blur(${videoBlur})`
          }}
        >
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="background-video"
          >
            <source src="https://cdn.abbs.one/videos/app-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        <div className="video-overlay"></div>
      </motion.div>

      {/* Fixed section title */}
      <motion.div 
        className="section-title-container"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="section-title">{t('whatIsABBSTitle')}</h2>
      </motion.div>

      <div className="what-is__content">
        <div className="text-container">
          {textPhrases.map((phrase, index) => (
            <div 
              key={index} 
              className={`problem-item ${problems[index].opacity > 0.5 ? 'active' : ''}`}
              style={{ 
                transform: `translateY(${problems[index].y}px)`
              }}
            >
              <div className="problem-content">
                <p>{phrase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIs; 