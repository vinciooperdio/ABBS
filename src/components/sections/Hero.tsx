import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';
import './Hero.scss';
import NebulaBackground from '../ui/NebulaBackground';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Mostra la schermata di caricamento per 3 secondi
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Schermata di caricamento */}
      <div className={`loading-screen ${loadingComplete ? 'hidden' : ''}`}>
        <h1 className="logo-text">ABBS</h1>
      </div>

      <section className="hero" ref={sectionRef}>
        <NebulaBackground />
        
        <div className="hero__container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: loadingComplete ? 0.2 : 3.2 // Aggiungi un ritardo se la schermata di caricamento è visibile
            }}
          >
            <motion.h1 
              className="hero__heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: loadingComplete ? 0.4 : 3.4,
                ease: "easeOut"
              }}
            >
              La <span className="gradient-text">Rivoluzione</span> degli<br />
              Abbonamenti è Qui
            </motion.h1>
            
            <motion.p 
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: loadingComplete ? 0.6 : 3.6,
                ease: "easeOut"
              }}
            >
              Gestisci tutti i tuoi abbonamenti in un'unica app: dai servizi digitali alle palestre,
              dai teatri alle piscine. Scopri nuovi servizi nella tua zona e risparmia tempo e denaro.
            </motion.p>
            
            <motion.div 
              className="hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: loadingComplete ? 0.8 : 3.8,
                ease: "easeOut"
              }}
            >
              <Button 
                href="/waitlist" 
                variant="secondary"
                className="hero__cta-button"
              >
                Unisciti alla lista d'attesa
              </Button>
              <Button 
                href="#features" 
                variant="secondary"
                className="hero__cta-button"
              >
                Scopri di più
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="hero__scroll-indicator">
          <div className="hero__mouse">
            <div className="hero__mouse-wheel"></div>
          </div>
          <div className="hero__scroll-text">Scopri di più</div>
        </div>
      </section>
    </>
  );
};

export default Hero; 