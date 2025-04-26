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
  
  // Check if section is in view
  const isInView = useInView(sectionRef, { margin: "-40% 0px -40% 0px" });
  const cardsInView = useInView(cardsRef, { margin: "-30% 0px -30% 0px", once: false });
  
  // Create transforms for header animations
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [100, 0, 0, 100]
  );
  
  // Create transforms for card staggered entrance
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );
  
  const cardsScale = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0.9, 1, 1, 0.9]
  );

  // Create transforms for text reveal
  const subtitleY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [50, 0, 0, 50]
  );
  
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0, 1, 1, 0]
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
        linkedin: 'https://linkedin.com/in/silvialamalfa',
        twitter: 'https://twitter.com/silvialamalfa'
      }
    },
    {
      name: 'Lorenzo Vincini',
      role: 'CTO & Lead Developer',
      bio: t('lorenzo'),
      image: lorenzoImage,
      social: {
        linkedin: 'https://linkedin.com/in/lorenzovincini',
        twitter: 'https://twitter.com/lorenzovincini'
      }
    }
  ];
  
  // Card animation variants with staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      opacity: 0,
      x: -100,
      scale: 0.9,
      rotateY: -10
    },
    visible: (i: number) => ({ 
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.7,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };
  
  // Animation variants for social icons with spring effect
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    },
    hover: { 
      y: -5, 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };
  
  // Card hover animation to make it more engaging
  const cardHoverVariants = {
    initial: {},
    hover: {
      y: -15,
      scale: 1.03,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };
  
  // Image hover animation for a subtle effect
  const imageHoverVariants = {
    initial: {},
    hover: {
      scale: 1.07,
      filter: "brightness(1.1)",
      transition: { duration: 0.4 }
    }
  };
  
  // Join section animations
  const joinVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  // Content reveal animation for bio text
  const contentRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
                textShadow: ["0 0 10px rgba(75, 69, 206, 0.2)", "0 0 20px rgba(75, 69, 206, 0.5)", "0 0 10px rgba(75, 69, 206, 0.2)"]
              }}
              transition={{
                duration: 2,
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
              opacity: cardsOpacity,
              scale: cardsScale
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
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover="hover"
                initial="initial"
                variants={cardHoverVariants}
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
                    <motion.h3 
                      className="team__name"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="team__role"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                    >
                      {member.role}
                    </motion.p>
                    
                    <div className="team__bio-container">
                      <motion.p 
                        className="team__bio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                      >
                        {member.bio}
                      </motion.p>
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
                          scale: 1.15, 
                          backgroundColor: "#0077B5",
                          boxShadow: "0 10px 15px rgba(0, 119, 181, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
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
                          scale: 1.15, 
                          backgroundColor: "#1DA1F2",
                          boxShadow: "0 10px 15px rgba(29, 161, 242, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
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
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('joinTeam')}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('alwaysLooking')}
            </motion.p>
            
            <motion.a 
              href="mailto:founders@abbs.one" 
              className="team__join-button"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 15px 30px rgba(75, 69, 206, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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