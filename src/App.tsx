import { useEffect } from 'react';
import Hero from './components/sections/Hero';
import Mission from './components/sections/Mission';
import WhatIs from './components/sections/WhatIs';
import Team from './components/sections/Team';
import Footer from './components/layout/Footer';
import CursorFollower from './components/ui/CursorFollower';
import Navbar from './components/ui/Navbar';
import CookieBanner from './components/CookieBanner';
import './App.scss';
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import SEO from './components/seo/SEO';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t, language } = useLanguage();

  // Set theme based on system preferences
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
  }, []);

  // Fix Windows overflow issues
  useEffect(() => {
    const fixWindowsOverflow = () => {
      if (navigator.userAgent.indexOf('Windows') !== -1) {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
      }
    };
    
    fixWindowsOverflow();
    window.addEventListener('resize', fixWindowsOverflow);
    
    return () => {
      window.removeEventListener('resize', fixWindowsOverflow);
    };
  }, []);

  return (
    <>
      <SEO 
        title={language === 'it' ? 'ABBS - Gestisci tutti i tuoi abbonamenti in un unico posto | La piattaforma abbonamenti' : 'ABBS - Manage all your subscriptions in one place'} 
        description={language === 'it' ? 
          'ABBS è la prima app italiana per gestire tutti i tuoi abbonamenti in un unico posto. Monitora, ottimizza e risparmia sui tuoi abbonamenti mensili.' : 
          'ABBS helps you manage all your subscriptions in one place. Discover, track and optimize your subscription expenses with a few clicks.'
        }
        keywords={language === 'it' ? 
          'abbs, abbonamenti, gestione abbonamenti, sottoscrizioni digitali, risparmiare, monitor abbonamenti, piattaforma abbonamenti' : 
          'abbs, subscriptions, subscription management, digital subscriptions, save money, subscription platform'
        }
        pathname="/"
      />
      <GoogleAnalytics />
      <CursorFollower />
      <Navbar />
      
      <main>
        <Hero />
        <Mission />
        <WhatIs />
        <Team />
      </main>
      
      <Footer />
      <CookieBanner />
    </>
  );
}

export default App; 
