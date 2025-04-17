import { useEffect } from 'react';
import Hero from './components/sections/Hero';
import Mission from './components/sections/Mission';
import WhatIs from './components/sections/WhatIs';
import Team from './components/sections/Team';
import WaitingList from './components/sections/WaitingList';
import Footer from './components/layout/Footer';
import CursorFollower from './components/ui/CursorFollower';
import Navbar from './components/ui/Navbar';
import './App.scss';

function App() {
  useEffect(() => {
    // Imposta il tema automaticamente in base alle preferenze di sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
  }, []);

  return (
    <>
      <CursorFollower />
      <Navbar />
      
      <main>
        <Hero />
        <Mission />
        <WhatIs />
        <Team />
        <WaitingList />
      </main>
      
      <Footer />
    </>
  );
}

export default App; 