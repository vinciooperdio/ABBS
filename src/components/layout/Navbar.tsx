import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import LanguageToggle from '../ui/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Controlla se siamo nella home page
    setIsHomePage(window.location.pathname === '/');
    
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  // Function for smooth scrolling to section
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    
    if (isHomePage) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close menu if it's open
        if (isOpen) {
          toggleMenu();
        }
        
        // Scroll to the element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Se non siamo nella home, navighiamo verso la home con l'hash
      window.location.href = '/' + targetId;
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  const links = [
    { name: t('mission'), href: '#mission', isExternal: false },
    { name: t('whatIsABBS'), href: '#what-is', isExternal: false },
    { name: t('timeline'), href: '#timeline', isExternal: false },
    { name: t('team'), href: '#team', isExternal: false },
    { name: t('business'), href: '/business', isExternal: true },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__container">
          {/* Logo on the left */}
          <div className="navbar__left">
            <a href="/" className="navbar__logo">
              <span className="logo-text">ABBS</span>
              <span className="logo-dot">.</span>
            </a>
          </div>

          {/* Center desktop menu */}
          <div className="navbar__center">
            <div className="navbar__desktop-menu">
              {links.map((link) => (
                link.isExternal ? (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    className="navbar__link"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="navbar__link"
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Language toggle and burger on the right */}
          <div className="navbar__right">
            <div className="navbar__actions">
              <LanguageToggle />
              
              <a 
                href="#waiting-list" 
                onClick={(e) => scrollToSection(e, '#waiting-list')}
                className="navbar-button-wrapper"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                >
                  {t('joinWaitlist')}
                </Button>
              </a>
              
              <button 
                className="navbar__menu-button" 
                onClick={toggleMenu} 
                aria-label="Toggle menu"
              >
                {isOpen ? <RiCloseLine /> : <RiMenu4Line />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div 
        className={`blur-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="mobile-menu__content">
              <div className="mobile-menu__links">
                {links.map((link) => (
                  link.isExternal ? (
                    <motion.div 
                      key={link.name}
                      variants={itemVariants}
                    >
                      <Link 
                        to={link.href} 
                        className="mobile-menu__link"
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a 
                      key={link.name} 
                      href={link.href} 
                      className="mobile-menu__link"
                      variants={itemVariants}
                      onClick={(e) => {
                        scrollToSection(e, link.href);
                      }}
                    >
                      {link.name}
                    </motion.a>
                  )
                ))}
              </div>

              <motion.div 
                className="mobile-menu__cta"
                variants={itemVariants}
              >
                <div className="mobile-menu__language">
                  <LanguageToggle />
                </div>
                <a 
                  href="#waiting-list" 
                  onClick={(e) => scrollToSection(e, '#waiting-list')}
                  className="mobile-button-wrapper"
                >
                  <Button 
                    variant="primary" 
                    fullWidth 
                  >
                    {t('joinWaitlist')}
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 