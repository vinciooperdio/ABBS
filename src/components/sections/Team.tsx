import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';
import SectionBackground from '../ui/SectionBackground';
import { useLanguage } from '../../context/LanguageContext';
import './Team.scss';

// Importo le immagini del team
import vincenzoImage from '../../assets/images/vincenzo.png';
import silviaImage from '../../assets/images/silvia.png';
import lorenzoImage from '../../assets/images/lorenzo.jpg';

const Team = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Detect mobile devices
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
  
  // Add scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Check if section is in view - simplified for better performance
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const cardsInView = useInView(cardsRef, { margin: "-20% 0px -20% 0px", once: true });
  
  // Create transforms for header animations - simplified for stability
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.5, 1, 1, 0.5]
  );
  
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [50, 0, 0, 50]
  );
  
  // Create transforms for card staggered entrance - simplified for stability
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0.5, 1, 1, 0.5]
  );
  
  // Create transforms for text reveal - simplified for stability
  const subtitleY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [30, 0, 0, 30]
  );
  
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0.5, 1, 1, 0.5]
  );
  
  const teamMembers = [
    {
      name: 'Vincenzo Elia Schilirò',
      role: 'Founder & CEO',
      bio: t('vincenzo'),
      image: vincenzoImage,
      social: {
        linkedin: 'https://www.linkedin.com/in/vinnari/',
        twitter: 'https://twitter.com/vincenzoschiliro'
      }
    },
    {
      name: 'Silvia La Malfa',
      role: 'COO & CFO',
      bio: t('silvia'),
      image: silviaImage,
      social: {
        linkedin: 'https://www.linkedin.com/in/silvia-la-malfa-b8a56024b/',
        twitter: 'https://twitter.com/silvialamalfa'
      }
    },
    {
      name: 'Lorenzo Vincini',
      role: 'CTO & Lead Developer',
      bio: t('lorenzo'),
      image: lorenzoImage,
      social: {
        linkedin: 'https://linkedin.com/in/lorenzo-vincini',
        twitter: 'https://twitter.com/lorenzovincini'
      }
    }
  ];
  
  // Card animation variants with staggered entrance - simplified
  const containerVariants = {
    hidden: { opacity: 0.8 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Simplified card variants to reduce visual bugs
  const cardVariants = {
    hidden: { 
      opacity: 0.5,
      y: 20,
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // Animation variants for social icons - simplified
  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Simplified card hover variant
  const cardHoverVariants = {
    initial: {},
    hover: {
      y: -5,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Image hover animation for a subtle effect - simplified
  const imageHoverVariants = {
    initial: {},
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  // Join section animations - simplified
  const joinVariants = {
    hidden: { 
      opacity: 0.5, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  // Content reveal animation for bio text - simplified
  const contentRevealVariants = {
    hidden: { opacity: 0.5, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div ref={sectionRef} id="team" className="team">
      <SectionBackground variant="primary">
        <div className="container">
          <motion.div 
            className="team__header"
            style={{ 
              opacity: headerOpacity,
              y: headerY
            }}
          >
            <motion.h2
              animate={{ 
                textShadow: ["0 0 10px rgba(75, 69, 206, 0.2)", "0 0 15px rgba(75, 69, 206, 0.4)", "0 0 10px rgba(75, 69, 206, 0.2)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              {t('ourTeam').split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i}> <span className="text-gradient">{word}</span></span> : 
                <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
              )}
            </motion.h2>
            
            <motion.p 
              className="team__subtitle"
              style={{
                opacity: subtitleOpacity,
                y: subtitleY
              }}
            >
              {t('teamSubtitle')}
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={cardsRef}
            className="team__grid"
            style={{ 
              opacity: cardsOpacity
            }}
            variants={containerVariants}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className={`team__card ${activeCard === index ? 'team__card--active' : ''}`}
                custom={index}
                variants={cardVariants}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover="hover"
                initial="initial"
                transition={{ duration: 0.3 }}
              >
                <div className="team__card-inner">
                  <motion.div 
                    className="team__image-container"
                    variants={imageHoverVariants}
                  >
                    <img src={member.image} alt={member.name} className="team__image" />
                    <div className="team__image-overlay"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="team__content"
                    variants={contentRevealVariants}
                  >
                    <h3 className="team__name">{member.name}</h3>
                    <p className="team__role">{member.role}</p>
                    
                    <div className="team__bio-container">
                      <p className="team__bio">{member.bio}</p>
                    </div>
                  
                    <motion.div 
                      className="team__social"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      <motion.a 
                        href={member.social.linkedin} 
                        className="team__social-link" 
                        aria-label="LinkedIn"
                        variants={socialIconVariants}
                        whileHover={{
                          y: -5, 
                          backgroundColor: "#0077B5"
                        }}
                      >
                        <FiLinkedin />
                      </motion.a>
                      {/*<motion.a 
                        href={member.social.twitter} 
                        className="team__social-link" 
                        aria-label="Twitter"
                        variants={socialIconVariants}
                        whileHover={{
                          y: -5, 
                          backgroundColor: "#1DA1F2"
                        }}
                      >
                        <FiTwitter />
                      </motion.a>*/}
                    </motion.div>
                  </motion.div>
                  
                  <div className="team__card-bg"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="team__join"
            variants={joinVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3>{t('joinTeam')}</h3>
            <p>{t('alwaysLooking')}</p>
            
            <motion.a 
              href="mailto:founders@abbs.one" 
              className="team__join-button"
              whileHover={{ 
                y: -5,
                backgroundColor: "#4540c9"
              }}
            >
              {t('viewOpenPositions')}
            </motion.a>
          </motion.div>
        </div>
      </SectionBackground>
    </div>
  );
};

export default Team; 