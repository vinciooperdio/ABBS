"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";
import React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Timeline.scss";
import roadmapVideo from "../../assets/videos/roadmap.mp4";

// Types
type TimelineItem = {
  date: string;
  heading: string;
  description: string;
  buttons: any[];
};

type Props = {
  items?: TimelineItem[];
};

// Default data for our timeline
const TimelineDefaults: Props = {
  items: [
    {
      date: "Q2 2023",
      heading: "Ricerca e Pianificazione",
      description:
        "Analisi di mercato, identificazione delle problematiche degli utenti, definizione della value proposition e architettura del sistema.",
      buttons: [
        { title: "Dettagli", variant: "secondary" }
      ]
    },
    {
      date: "Q3 2023",
      heading: "Sviluppo MVP",
      description:
        "Sviluppo del backend per la gestione degli abbonamenti, creazione dell'interfaccia utente basilare e implementazione delle notifiche.",
      buttons: [
        { title: "Scopri di più", variant: "secondary" }
      ]
    },
    {
      date: "Q4 2023",
      heading: "Beta Testing",
      description:
        "Versione beta per un pubblico selezionato, raccolta feedback utenti e ottimizzazione dell'usabilità.",
      buttons: [
        { title: "Approfondisci", variant: "secondary" }
      ]
    },
    {
      date: "Q1 2024",
      heading: "Lancio App Mobile",
      description:
        "Sviluppo e rilascio delle app iOS e Android, con notifiche push e sincronizzazione cross-platform.",
      buttons: [
        { title: "Vedi anteprima", variant: "secondary" }
      ]
    },
    {
      date: "Q2 2024",
      heading: "Espansione Internazionale",
      description:
        "Localizzazione in più lingue, adattamento a regolamenti internazionali e partnership globali.",
      buttons: [
        { title: "Scopri di più", variant: "secondary" }
      ]
    }
  ]
};

const Timeline = (props: Props) => {
  const { items = [] } = {
    ...TimelineDefaults,
    ...props,
  };

  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { 
    margin: "-40% 0px -40% 0px", // Increased margin for earlier detection
    once: false 
  });

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Track scroll position within section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create transforms for effects
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
    ["8px", "8px", "2px", "2px", "8px", "8px"]
  );

  // Title opacity for fixed title
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.85, 0.9],
    [0, 1, 1, 0]
  );

  // Set active timeline item based on scroll position - show each item one at a time
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Only show items when video is fully visible
      if (value < 0.2 || value > 0.85) {
        setActiveItemIndex(-1);
        return;
      }
      
      // Divide the visible scroll range (0.2-0.85 = 0.65) by the number of items
      // to determine equal segments for each item
      const visibleScrollRange = 0.65;
      const segmentSize = visibleScrollRange / items.length;
      
      // Calculate which segment we're in based on the current scroll progress
      for (let i = 0; i < items.length; i++) {
        const segmentStart = 0.2 + (i * segmentSize);
        const segmentEnd = segmentStart + segmentSize;
        
        if (value >= segmentStart && value < segmentEnd) {
          setActiveItemIndex(i);
          break;
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  // Play/pause video
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section id="roadmap" className={`timeline-section ${isMobile ? 'timeline-section--mobile' : ''}`} ref={sectionRef}>
      <motion.div 
        className="video-container"
        style={{ 
          opacity: videoOpacity
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
            <source src={roadmapVideo} type="video/mp4" />
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
        <h2 className="section-title">La nostra Roadmap</h2>
      </motion.div>

      <div className="timeline-content">
        <div className="timeline-progress">
          {items.map((_, index) => (
            <div 
              key={index}
              className={`timeline-dot ${index <= activeItemIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        
        <div className="timeline-items">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === activeItemIndex ? 1 : 0,
                y: index === activeItemIndex ? 0 : (isMobile ? 30 : 50),
                scale: index === activeItemIndex ? 1 : 0.95
              }}
              transition={{ 
                opacity: { duration: 0.7, ease: "easeInOut" },
                y: { duration: 0.7, ease: "easeInOut" },
                scale: { duration: 0.7, ease: "easeInOut" }
              }}
              style={{
                position: 'absolute',
                display: index === activeItemIndex || (index === activeItemIndex - 1 && !isMobile) ? 'flex' : 'none'
              }}
            >
              <div className="timeline-item-date">{item.date}</div>
              <h2 className="timeline-item-heading">{item.heading}</h2>
              <p className="timeline-item-description">{item.description}</p>
              <div className="timeline-item-buttons">
                {item.buttons.map((button, idx) => (
                  <Button key={idx} variant={button.variant as any || "primary"}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline; 