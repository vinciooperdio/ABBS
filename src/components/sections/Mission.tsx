import React, { useState, useRef, useEffect } from 'react';
import { motion, easeOut, useInView, useScroll, useTransform } from 'framer-motion';
import { FaExchangeAlt, FaBomb, FaCheckCircle, FaCreditCard, FaClock, FaPercent, FaMoneyBillWave, FaCalendarAlt, FaBullseye, FaBell, FaFileAlt, FaSearch, FaPlus, FaDumbbell, FaSwimmer, FaFilm, FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import { BsSpotify } from 'react-icons/bs';
import { SiNetflix, SiAmazon, SiApple, SiMicrosoftoffice } from 'react-icons/si';
import { IoFitness, IoWater } from 'react-icons/io5';
import { FiMapPin } from 'react-icons/fi';
import { MdTheaters } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { useLanguage } from '../../context/LanguageContext';
import InteractiveMap from '../ui/InteractiveMap';
import LaptopContainer from '../ui/LaptopContainer';
import './Mission.scss';
import SimplifiedNebulaBackground from '../ui/SimplifiedNebulaBackground';
import AirbnbStyleMap from '../ui/AirbnbStyleMap';

interface PhysicalService {
  id: string;
  name: string;
  type: 'gym' | 'pool' | 'theater';
  distance: string;
  rating: number;
  price: string;
  position: [number, number]; // [latitude, longitude]
}

const Mission: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isNearTop, setIsNearTop] = useState(false);
  
  // Track scroll position within section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Check if header is in view
  const headerInView = useInView(headerRef, { 
    margin: "-10% 0px -10% 0px",
    once: false 
  });
  
  // Check if benefits section is in view
  const benefitsInView = useInView(benefitsRef, { 
    margin: "-20% 0px -20% 0px",
    once: false 
  });

  const isMapSectionInView = useInView(mapSectionRef, { 
    amount: 0.3,
    once: false
  });

  const handleMarkerClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const subscriptionServices = [
    { id: 'netflix', name: 'Netflix', icon: <SiNetflix className="subscription-icon netflix" />, cost: '€14,99/mese', date: '15' },
    { id: 'spotify', name: 'Spotify Premium', icon: <BsSpotify className="subscription-icon spotify" />, cost: '€9,99/mese', date: '22' },
    { id: 'amazon', name: 'Amazon Prime', icon: <SiAmazon className="subscription-icon amazon" />, cost: '€7,99/mese', date: '3' },
    { id: 'icloud', name: 'iCloud Storage', icon: <SiApple className="subscription-icon icloud" />, cost: '€2,99/mese', date: '28' },
    { id: 'fitness', name: 'Fitness App', icon: <IoFitness className="subscription-icon fitness" />, cost: '€19,99/mese', date: '10' },
    { id: 'office', name: 'Microsoft 365', icon: <SiMicrosoftoffice className="subscription-icon office" />, cost: '€6,99/mese', date: '7' },
  ];

  const physicalServices = [
    {
      id: 'serv1',
      name: 'Palestra Olympia',
      type: 'gym',
      position: [41.9028, 12.4964] as [number, number], // Roma
      distance: '1.2 km',
      rating: 4.5,
      price: '149 €'
    },
    {
      id: 'serv2',
      name: 'Piscina Poseidon',
      type: 'pool',
      position: [41.9100, 12.5000] as [number, number],
      distance: '1.7 km',
      rating: 4.2,
      price: '206 €'
    },
    {
      id: 'serv3',
      name: 'Teatro Apollo',
      type: 'theater',
      position: [41.9050, 12.4850] as [number, number],
      distance: '800 m',
      rating: 4.8,
      price: '329 €'
    },
    {
      id: 'serv4',
      name: 'FitLife Gym',
      type: 'gym',
      position: [41.9150, 12.4920] as [number, number],
      distance: '2.1 km',
      rating: 4.0,
      price: '122 €'
    },
    {
      id: 'serv5',
      name: 'Acqua & Wellness',
      type: 'pool',
      position: [41.9000, 12.5100] as [number, number],
      distance: '2.3 km',
      rating: 4.7,
      price: '296 €'
    },
    {
      id: 'serv6',
      name: 'Cinema Splendor',
      type: 'cinema',
      position: [41.9080, 12.4780] as [number, number],
      distance: '1.5 km',
      rating: 4.3,
      price: '200 €'
    },
    {
      id: 'serv7',
      name: 'Teatro dell\'Opera',
      type: 'theater',
      position: [41.8950, 12.4920] as [number, number],
      distance: '1.9 km',
      rating: 4.9,
      price: '627 €'
    },
    {
      id: 'serv8',
      name: 'Gold Fitness Club',
      type: 'gym',
      position: [41.9200, 12.4930] as [number, number],
      distance: '3.2 km',
      rating: 4.1,
      price: '157 €'
    },
    {
      id: 'serv9',
      name: 'Auditorium Roma',
      type: 'concert',
      position: [41.9280, 12.5150] as [number, number],
      distance: '4.1 km',
      rating: 4.6,
      price: '419 €'
    },
    {
      id: 'serv10',
      name: 'Centro Aqua Fitness',
      type: 'pool',
      position: [41.8900, 12.4850] as [number, number],
      distance: '2.8 km',
      rating: 4.4,
      price: '252 €'
    },
    {
      id: 'serv11',
      name: 'Multisala Rex',
      type: 'cinema',
      position: [41.9130, 12.5070] as [number, number],
      distance: '2.4 km',
      rating: 4.2,
      price: '148 €'
    },
    {
      id: 'serv12',
      name: 'Super Gym Plus',
      type: 'gym',
      position: [41.8930, 12.5000] as [number, number],
      distance: '3.0 km',
      rating: 4.3,
      price: '3.271 €'
    },
    {
      id: 'serv13',
      name: 'Palazzo dei Congressi',
      type: 'concert',
      position: [41.9180, 12.4750] as [number, number],
      distance: '2.7 km',
      rating: 4.7,
      price: '2.346 €'
    },
    {
      id: 'serv14',
      name: 'Centro Sportivo Elite',
      type: 'pool',
      position: [41.9030, 12.5210] as [number, number],
      distance: '3.5 km',
      rating: 4.5,
      price: '1.372 €'
    },
    {
      id: 'serv15',
      name: 'Arena Concert Hall',
      type: 'concert',
      position: [41.8850, 12.4930] as [number, number],
      distance: '3.9 km',
      rating: 4.8,
      price: '3.050 €'
    },
    {
      id: 'serv16',
      name: 'Metropolitan Theater',
      type: 'theater',
      position: [41.9250, 12.4850] as [number, number],
      distance: '2.6 km',
      rating: 4.4,
      price: '3.693 €'
    },
    {
      id: 'serv17',
      name: 'Cinema Star',
      type: 'cinema',
      position: [41.9080, 12.5220] as [number, number],
      distance: '3.1 km',
      rating: 4.0,
      price: '12.602 €'
    }
  ];


  const abbsFeatures = [
    { 
      icon: <FaBullseye />, 
      title: t('completeTracking'), 
      description: t('completeTrackingDesc')
    },
    { 
      icon: <FaBell />, 
      title: t('smartNotifications'), 
      description: t('smartNotificationsDesc')
    },
    { 
      icon: <FaSearch />, 
      title: t('priceComparison'), 
      description: t('priceComparisonDesc')
    },
    { 
      icon: <FaFileAlt />, 
      title: t('documentManagement'), 
      description: t('documentManagementDesc')
    },
  ];

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.8 
      } 
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, x: -100, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.6 
      }
    }
  };
  
  // Header animations with scroll interaction
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3],
    [0.3, 1, 1]
  );
  
  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3],
    [0.9, 1, 1]
  );
  
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3],
    [40, 0, 0]
  );

  const inView = useInView(headerRef, { 
    margin: "-20% 0px 0px 0px",  // Imposta un margine negativo per rilevare la posizione
    once: false 
  });

  useEffect(() => {
    if (inView) {
      const headerElement = headerRef.current;
      if (headerElement) {
        const rect = headerElement.getBoundingClientRect();
        if (rect.top < 350) {  // Se la distanza dal bordo superiore è inferiore a 50px
          setIsNearTop(true);  // Smetti di animare
        } else {
          setIsNearTop(false);  // Continua ad animare
        }
      }
    }
  }, [inView]);

  const floatingAnimation = {
    y: [0, -15, 0],  // Smette di oscillare quando vicino al limite superiore
    transition: {
      duration: 3,
      repeat: Infinity, // Non ripetere quando vicino al limite
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section ref={sectionRef} id="mission" className="mission">
      <SimplifiedNebulaBackground />
      <div className="container">
        <motion.div 
          ref={headerRef}
          className="mission__header"
          variants={fadeInUp}
          style={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale
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
            {t('ourMission').split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i}> <span className="text-gradient">{word}</span></span> : 
              <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
            )}
          </motion.h2>
          
          <motion.div
            className="mission__subtitle-container"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.p className="mission__subtitle">
              {t('missionDescription')}
            </motion.p>
            
            <motion.div 
              className="mission__icons"
              animate={floatingAnimation}
            >
              <motion.div 
                className="mission__icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <SiNetflix />
              </motion.div>
              <motion.div 
                className="mission__icon"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <BsSpotify />
              </motion.div>
              <motion.div 
                className="mission__icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <FaDumbbell />
              </motion.div>
              <motion.div 
                className="mission__icon"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <FaSwimmer />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          ref={benefitsRef}
          className="mission__benefits-section"
          initial={{ opacity: 0, y: 50 }}
          animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mission__section-title">
            <h3>{t('abbsAdvantages').split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i}> <span className="text-gradient">{word}</span></span> : 
              <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
            )}</h3>
          </div>
          
          <motion.div 
            className="mission__benefits-grid"
            variants={staggerItems}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
          >
            {abbsFeatures.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="mission__benefit-card"
                variants={itemFade}
                custom={index}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="benefit-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {feature.icon}
                </motion.div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.section 
          className="mission__map-section"
          ref={mapSectionRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <motion.div 
            className="mission__map-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>
              {t('discoverNearbyServices').split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i}> <span className="text-gradient">{word}</span></span> : 
                <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
              )}
            </h3>
            <p>{t('discoverNearbyServicesDesc')}</p>
          </motion.div>
          
          <div className="mission__map-container mission__map-container--airbnb">
            <AirbnbStyleMap 
              userPosition={[41.9028, 12.4964]} 
              services={physicalServices}
            /></div>
        </motion.section>
      </div>
    </section>
  );
};

export default Mission; 