import { useEffect } from 'react';
import Hero from './components/sections/Hero';
import Mission from './components/sections/Mission';
import WhatIs from './components/sections/WhatIs';
import Team from './components/sections/Team';
import Footer from './components/layout/Footer';
import CursorFollower from './components/ui/CursorFollower';
import Navbar from './components/ui/Navbar';
import './App.scss';
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import SEO from './components/seo/SEO';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Imposta il tema automaticamente in base alle preferenze di sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
  }, []);

  return (
    <>
      <SEO 
        title={language === 'it' ? 'ABBS - Gestisci tutti i tuoi abbonamenti in un unico posto' : 'ABBS - Manage all your subscriptions in one place'} 
        description={language === 'it' ? 
          'ABBS ti aiuta a gestire tutti i tuoi abbonamenti in un unico posto. Scopri, monitora e ottimizza le tue spese in abbonamento con pochi clic.' : 
          'ABBS helps you manage all your subscriptions in one place. Discover, track and optimize your subscription expenses with a few clicks.'
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
    </>
  );
}

export default App; 