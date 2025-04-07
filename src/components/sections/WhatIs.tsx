import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './WhatIs.scss';
import video from "../../assets/videos/app_reduced.mp4";

const WhatIs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTextIndex, setActiveTextIndex] = useState(-1);
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
    [0, 0, 0.5, 1, 1, 0, 0]
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
    t('whatIsPhrase7'),
    t('whatIsPhrase8')
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
        <h2 className="section-title">{t('whatIsABBSTitle')}</h2>
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
                opacity: { duration: 0.7, ease: "easeInOut" },
                y: { duration: 0.7, ease: "easeInOut" }
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