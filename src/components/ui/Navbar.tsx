import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import Sidebar from './Sidebar';
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

  // Handler per il logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <Link 
            to="/" 
            className="navbar__logo"
            onClick={handleLogoClick}
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
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Separato il componente Sidebar dalla Navbar */}
      <Sidebar 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isHomePage={isHomePage}
      />
    </>
  );
};

export default Navbar; 