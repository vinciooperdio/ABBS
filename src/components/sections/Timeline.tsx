"use client";

import React, { useState, useRef } from "react";
import Button from "../ui/Button";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import "./Timeline.scss";

// Types
type TimelineItem = {
  date: string;
  heading: string;
  description: string;
  buttons: {
    title: string;
    variant?: string;
    href?: string;
  }[];
};

type Props = {
  items?: TimelineItem[];
};

const Timeline = (props: Props) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Check if section is in view for animations
  const isInView = useInView(sectionRef, {
    margin: "-10% 0px -10% 0px",
    once: false
  });
  
  // Default data for our timeline
  const TimelineDefaults: Props = {
    items: [
      {
          date: "Q1 2025",
          heading: "Validazione & Strategia",
          description: "Analisi dell'idea, definizione delle funzionalità chiave del prodotto, studio del mercato di riferimento, Business Model Canvas, Business Plan e progettazione dell'architettura tecnica.",
          buttons: [
          { title: t('timelineDetails'), variant: "secondary", href: "#mission" }
        ]
      },
      {
          date: "Q2 2025",
          heading: "Costruzione delle Basi",
          description: "Ricezione del primo investimento, costituzione della società, apertura dell'ufficio operativo, ricerca di mercato mirata e settaggio dei flussi interni per partire al meglio.",
          buttons: [
          { title: t('timelineLearnMore'), variant: "secondary", href: "#what" }
        ]
      },
      {
          date: "Q3 2025",
          heading: "MVP & Prime Attività",
          description: "Sviluppo e test dell'MVP di ABBS con aziende pilota e utenti in versione alpha. Avvio del side business per le PMI con primi progetti e fatturato. Utilizzo della traction per attirare investitori.",
          buttons: [
          { title: t('timelineExploreMore'), variant: "secondary", href: "#contact" }
        ]
      },
      {
          date: "Q4 2025",
          heading: "Beta & Crescita",
          description: "Lancio della versione beta, raccolta feedback da utenti business e consumer. Crescita delle entrate da PMI. Preparazione al round di investimento per espandere il team e arrivare al lancio ufficiale nel Q1 2026.",
          buttons: [
          { title: t('timelinePreview'), variant: "secondary", href: "#team" }
        ]
      }
    ]
  };

  const { items = [] } = {
    ...TimelineDefaults,
    ...props,
  };

  const [activeItem, setActiveItem] = useState(0);

  // Funzione per cambiare l'elemento attivo
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <section id="timeline" className="timeline-section" ref={sectionRef}>
      <div className="timeline-container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">{t('timelineTitle')}</h2>
        </motion.div>

        <div className="timeline-content">
          <div className="timeline-progress">
            {items.map((_, index) => (
              <div 
                key={index}
                className={`timeline-dot ${index === activeItem ? 'active' : ''}`}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
          
          <div className="timeline-items">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: index === activeItem ? 1 : 0,
                  y: index === activeItem ? 0 : 30,
                  scale: index === activeItem ? 1 : 0.95
                }}
                transition={{ 
                  opacity: { duration: 0.5, ease: "easeInOut" },
                  y: { duration: 0.5, ease: "easeInOut" },
                  scale: { duration: 0.5, ease: "easeInOut" }
                }}
                style={{
                  display: index === activeItem ? 'flex' : 'none'
                }}
              >
                <div className="timeline-item-date">{item.date}</div>
                <h2 className="timeline-item-heading">{item.heading}</h2>
                <p className="timeline-item-description">{item.description}</p>
                <div className="timeline-item-buttons">
                  {item.buttons.map((button, idx) => (
                    <Button 
                      key={idx} 
                      variant={button.variant as any || "primary"}
                      href={button.href}
                    >
                      {button.title}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 