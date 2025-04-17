import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { t } = useLanguage();
  // Traccia lo scroll della pagina per cambiare lo stile della navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Impedisce lo scroll del body quando il menu è aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Toggle del menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Chiude il menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Gestisce la navigazione ai link esterni (altre pagine)
  const handleExternalNavigation = (path: string) => {
    closeMenu();
    window.scrollTo(0, 0); // Scorre all'inizio della pagina
    navigate(path);
  };

  // Function for smooth scrolling to section
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    
    if (isHomePage) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close menu
        closeMenu();
        
        // Scroll to the element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home with hash and scroll to top
      closeMenu();
      window.scrollTo(0, 0); // Scorre all'inizio della pagina
      window.location.href = '/' + targetId;
    }
  };

  // Links del menu per la home page
  const homeLinks = [
    { name: t('mission'), href: '#mission', isExternal: false },
    { name: t('whatIsABBS'), href: '#what-is', isExternal: false },
    { name: t('timeline'), href: '#timeline', isExternal: false },
    { name: t('waitingList'), href: '#waiting-list', isExternal: false },
    { name: t('team'), href: '#team', isExternal: false },
    { name: t('business'), href: '/business', isExternal: true },
  ];

  // Links del menu per la pagina business
  const businessLinks = [
    { name: 'Home', href: '/', isExternal: true },
    { name: 'Come Funziona', href: '/business#how-it-works', isExternal: false },
    { name: 'Vantaggi', href: '/business#benefits', isExternal: false },
    { name: 'Confronto', href: '/business#comparison', isExternal: false },
    { name: 'Prova Gratuita', href: '/business#cta', isExternal: false }
  ];

  // Scegli i link in base alla pagina corrente
  const menuLinks = isHomePage ? homeLinks : businessLinks;

  // Varianti per le animazioni
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%' 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link 
          to="/" 
          className="navbar__logo"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            window.scrollTo(0, 0);
            navigate('/');
          }}
        >
          <span>abbs.one</span>
        </Link>
        
        <div className="navbar__controls">
          <LanguageToggle />
          <button 
            className="navbar__toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
        
        {/* Overlay con sfondo sfocato */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>

        {/* Menu navigazione - sidebar a destra */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="navbar__sidebar"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="navbar__sidebar-header">
                <button 
                  className="navbar__sidebar-close" 
                  onClick={closeMenu}
                  aria-label="Chiudi menu"
                >
                  <HiX size={24} />
                </button>
                <h3>Menu</h3>
              </div>

              <ul className="navbar__sidebar-list">
                {menuLinks.map((link, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    className="navbar__sidebar-item"
                  >
                    {link.isExternal ? (
                      <a 
                        href="#"
                        className="navbar__sidebar-link" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleExternalNavigation(link.href);
                        }}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a 
                        href={link.href} 
                        className="navbar__sidebar-link" 
                        onClick={(e) => scrollToSection(e, link.href)}
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar; 