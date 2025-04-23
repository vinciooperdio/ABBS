import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isHomePage }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Gestisce la navigazione ai link esterni (altre pagine)
  const handleExternalNavigation = (path: string) => {
    onClose();
    window.scrollTo(0, 0); // Scorre all'inizio della pagina
    navigate(path);
  };

  // Function for smooth scrolling to section
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    
    // Extract just the id part (removing any path)
    const id = targetId.includes('#') ? targetId.split('#')[1] : targetId;
    const selector = `#${id}`;
    
    // Find the element on the current page
    const targetElement = document.querySelector(selector);
    
    if (targetElement) {
      // Close menu
      onClose();
      
      // Scroll to the element
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else if (isHomePage) {
      // Navigate to home with hash and scroll to top
      onClose();
      window.scrollTo(0, 0);
      window.location.href = '/' + targetId;
    }
  };

  // Links del menu per la home page
  const homeLinks = [
    { name: t('mission'), href: '#mission', isExternal: false },
    { name: t('whatIsABBS'), href: '#what-is', isExternal: false },
    { name: t('team'), href: '#team', isExternal: false },
    { name: t('business'), href: '/business', isExternal: true },
  ];

  // Links del menu per la pagina business
  const businessLinks = [
    { name: 'Home', href: '/', isExternal: true },
    { name: t('Vantaggi'), href: '#benefits', isExternal: false },
    { name: t('Come Funziona'), href: '#how-it-works', isExternal: false },
    { name: 'FAQ', href: '#faq', isExternal: false },
    { name: t('Contattaci'), href: '#contact', isExternal: false }
  ];

  // Scegli i link in base alla pagina corrente
  const menuLinks = isHomePage ? homeLinks : businessLinks;

  // Varianti per le animazioni
  const sidebarVariants = {
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
    <>
      {/* Overlay con sfondo sfocato */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sidebar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Menu navigazione - sidebar a destra */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            className="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="sidebar__header">
              <button 
                className="sidebar__close" 
                onClick={onClose}
                aria-label="Chiudi menu"
              >
                <HiX size={24} />
              </button>
              <h3>Menu</h3>
            </div>

            <ul className="sidebar__list">
              {menuLinks.map((link, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  className="sidebar__item"
                >
                  {link.isExternal ? (
                    <a 
                      href="#"
                      className="sidebar__link" 
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
                      className="sidebar__link" 
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
    </>
  );
};

export default Sidebar; 