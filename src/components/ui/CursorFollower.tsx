import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CursorFollower.scss';

const CursorFollower: React.FC = () => {
  // Utilizziamo useRef per le posizioni correnti e target per l'interpolazione
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Posizione attuale e target per l'interpolazione fluida
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Parametri di interpolazione - regolabili per ottenere l'effetto desiderato
  const dotLerp = 0.2; // Velocità di interpolazione del punto (più alto = più veloce)
  const ringLerp = 0.1; // Velocità di interpolazione dell'anello (più basso = effetto trailing)

  // Funzione di interpolazione lineare 
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Nasconde il cursore nativo
  useEffect(() => {
    if (isMobile) return;
    
    document.body.classList.add('hide-cursor');
    
    return () => {
      document.body.classList.remove('hide-cursor');
    };
  }, [isMobile]);

  // Animation loop per l'interpolazione fluida
  useEffect(() => {
    if (isMobile) return;
    
    let animationFrameId: number;
    
    const updateCursorPosition = () => {
      // Calcolo dell'interpolazione per movimento più fluido
      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, dotLerp);
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, dotLerp);
      
      ringPosition.current.x = lerp(ringPosition.current.x, mousePosition.current.x, ringLerp);
      ringPosition.current.y = lerp(ringPosition.current.y, mousePosition.current.y, ringLerp);
      
      // Applicazione diretta degli stili per massima performance
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosition.current.x}px, ${dotPosition.current.y}px, 0) scale(${isClicking ? 0.8 : isHovering ? 1.2 : 1})`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) scale(${isClicking ? 1.2 : isHovering ? 1.5 : 1})`;
      }
      
      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };
    
    // Avvio dell'animation loop
    animationFrameId = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isHovering, isClicking]);

  // Manage mouse events
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Aggiorniamo solo la posizione target
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Ottimizzazione: utilizziamo event delegation invece di molti ascoltatori
    const handleElementInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive: boolean = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.classList.contains('clickable');
      
      setIsHovering(isInteractive);
    };
    
    // Hide when cursor leaves the window
    const handleWindowMouseLeave = () => setIsVisible(false);
    const handleWindowMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementInteraction, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleWindowMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleWindowMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementInteraction);
      document.documentElement.removeEventListener('mouseleave', handleWindowMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleWindowMouseEnter);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <div 
      className={`cursor-follower ${isVisible ? 'visible' : ''}`}
      ref={cursorRef}
    >
      <div 
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
      />
      
      <div 
        ref={ringRef}
        className={`cursor-ring ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
      />
    </div>
  );
};

export default CursorFollower;