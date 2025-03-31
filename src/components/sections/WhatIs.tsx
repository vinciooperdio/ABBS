import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './WhatIs.scss';
import video from "../../assets/videos/app-demo.mp4";

const WhatIs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTextIndex, setActiveTextIndex] = useState(-1);
  
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
  
  // Create transforms for various effects
  const videoOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.15, 0.2, 0.75, 0.85, 0.95], 
    [0, 0, 0.5, 1, 1, 0, 0]
  );
  
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.75, 0.85, 0.95],
    [1.1, 1.1, 1, 1, 1.1, 1.1]
  );
  
  const videoBlur = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.75, 0.85, 0.95],
    ["8px", "8px", "0px", "0px", "8px", "8px"]
  );

  // Title opacity control
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.85, 0.9],
    [0, 1, 1, 0]
  );

  const textPhrases = [
    "Non dovrai più cercare in siti diversi per le informazioni dei tuoi abbonamenti",
    "Centralizza tutti i tuoi abbonamenti in un'unica dashboard interattiva",
    "Monitora scadenze, costi e ricevi notifiche intelligenti prima dei rinnovi",
    "La nostra AI analizza le tue abitudini e suggerisce piani più adatti",
    "Risparmia fino al 30% sui tuoi abbonamenti mensili",
    "Visualizza grafici e statistiche sul tuo utilizzo",
    "Accedi a promozioni e sconti riservati agli utenti ABBS",
    "Interfaccia intuitiva che semplifica la gestione con pochi click"
  ];

  // Calculate which text should be visible based on scroll position - fewer segments for longer display
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Only start showing text after initial fade-in
      if (value < 0.25) {
        setActiveTextIndex(-1);
        return;
      }
      
      if (value > 0.75) {
        setActiveTextIndex(-1);
        return;
      }
      
      // Create 4 distinct segments instead of 8 for longer visibility
      const segmentCount = 4;
      const normalizedProgress = (value - 0.25) / 0.5;
      const segmentIndex = Math.min(Math.floor(normalizedProgress * segmentCount), segmentCount - 1);
      
      // Map segment index to phrase index
      const phraseIndex = Math.min(Math.floor((segmentIndex / segmentCount) * textPhrases.length), textPhrases.length - 1);
      
      setActiveTextIndex(phraseIndex);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, textPhrases.length]);

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
            <source src={video} type="video/mp4" />
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
        <h2 className="section-title">Cos'è ABBS?</h2>
      </motion.div>

      <div className="what-is__content">
        <div className="text-container">
          {textPhrases.map((phrase, index) => (
            <motion.div
              key={index}
              className="text-phrase"
              initial={{ opacity: 0, y: -100 }}
              animate={{ 
                opacity: index === activeTextIndex ? 1 : 0,
                y: index === activeTextIndex ? 0 : index < activeTextIndex ? 100 : -100
              }}
              transition={{ 
                opacity: { duration: 1, ease: "easeInOut" },
                y: { duration: 1, ease: "easeInOut" }
              }}
            >
              {phrase}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIs; 