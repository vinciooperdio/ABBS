import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Shield, Zap, Award } from 'lucide-react';

// Define interfaces for TypeScript
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  advantage: number;
  targetX: number | null;
  targetY: number | null;
  inTransition: boolean;
  opacity: number;
  originalSpeedX: number;
  originalSpeedY: number;
}

interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  particleColor: string;
}

interface Point {
  x: number;
  y: number;
}

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ title, subtitle }) => {
  // Refs and state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: 600 // Default height for the section
  });

  // Benefits data
  const advantages: Advantage[] = [
    {
      icon: <Monitor size={24} />,
      title: "Monitoraggio Avanzato",
      description: "Sistema di monitoraggio in tempo reale con notifiche istantanee e dashboard personalizzabile.",
      color: "#0ea5e9",
      particleColor: "rgb(14, 165, 233)"
    },
    {
      icon: <Shield size={24} />,
      title: "Sicurezza Garantita",
      description: "Protezione crittografata a più livelli e sistema di backup automatizzato per i tuoi dati.",
      color: "#10b981",
      particleColor: "rgb(16, 185, 129)"
    },
    {
      icon: <Zap size={24} />,
      title: "Prestazioni Ottimizzate",
      description: "Algoritmi di ultima generazione per velocizzare ogni operazione e ridurre i tempi di attesa.",
      color: "#f59e0b",
      particleColor: "rgb(245, 158, 11)"
    },
    {
      icon: <Award size={24} />,
      title: "Assistenza Premium",
      description: "Supporto tecnico dedicato 24/7 e consulenze personalizzate per massimizzare i risultati.",
      color: "#8b5cf6",
      particleColor: "rgb(139, 92, 246)"
    }
  ];

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    // Initial size
    setTimeout(handleResize, 100);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const NUM_PARTICLES = 200;
    const newParticles: Particle[] = [];

    // Create initial particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const advantageIndex = i % advantages.length;
      const size = Math.random() * 3 + 1;
      
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: advantages[advantageIndex].particleColor,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        advantage: advantageIndex,
        targetX: null,
        targetY: null,
        inTransition: false,
        opacity: 0.4 + Math.random() * 0.3,
        originalSpeedX: (Math.random() - 0.5) * 0.7,
        originalSpeedY: (Math.random() - 0.5) * 0.7
      });
    }

    particles.current = newParticles;

    const updateParticles = () => {
      particles.current.forEach(particle => {
        if (particle.targetX === null) {
          // Free movement
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Bounce at edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
          
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY = -particle.speedY;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }
        } else if (particle.inTransition) {
          // Movement towards target
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          particle.x += dx * 0.08;
          particle.y += dy * 0.08;
          
          // If close enough to destination, consider it arrived
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            particle.inTransition = false;
            particle.x = particle.targetX;
            particle.y = particle.targetY;
          }
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`);
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, advantages.length]);

  // Handle advantage detail display
  const showAdvantageDetail = (index: number) => {
    setActiveAdvantage(index);
    
    setTimeout(() => {
      const detailElement = detailRefs.current[index];
      if (!detailElement) return;
      
      const rect = detailElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const cardWidth = rect.width + 40;
      const cardHeight = rect.height + 40;
      
      const relevantParticles = particles.current.filter(p => p.advantage === index);
      const points: Point[] = [];
      
      const perimeter = 2 * (cardWidth + cardHeight);
      const numPoints = relevantParticles.length;
      const pointsPerPixel = numPoints / perimeter;
      
      // Function to add points to a segment
      const addPointsToSegment = (startX: number, startY: number, endX: number, endY: number, count: number) => {
        const dx = (endX - startX) / count;
        const dy = (endY - startY) / count;
        
        for (let i = 0; i < count; i++) {
          points.push({
            x: startX + dx * i,
            y: startY + dy * i
          });
        }
      };
      
      // Top side (left to right)
      const topPoints = Math.floor(cardWidth * pointsPerPixel);
      addPointsToSegment(
        centerX - cardWidth/2, centerY - cardHeight/2,
        centerX + cardWidth/2, centerY - cardHeight/2,
        topPoints
      );
      
      // Right side (top to bottom)
      const rightPoints = Math.floor(cardHeight * pointsPerPixel);
      addPointsToSegment(
        centerX + cardWidth/2, centerY - cardHeight/2,
        centerX + cardWidth/2, centerY + cardHeight/2,
        rightPoints
      );
      
      // Bottom side (right to left)
      const bottomPoints = Math.floor(cardWidth * pointsPerPixel);
      addPointsToSegment(
        centerX + cardWidth/2, centerY + cardHeight/2,
        centerX - cardWidth/2, centerY + cardHeight/2,
        bottomPoints
      );
      
      // Left side (bottom to top)
      const leftPoints = Math.floor(cardHeight * pointsPerPixel);
      addPointsToSegment(
        centerX - cardWidth/2, centerY + cardHeight/2,
        centerX - cardWidth/2, centerY - cardHeight/2,
        leftPoints
      );
      
      // Distribute particles along the calculated points
      relevantParticles.forEach((particle, particleIndex) => {
        const pointIndex = particleIndex % points.length;
        particle.targetX = points[pointIndex].x;
        particle.targetY = points[pointIndex].y;
        particle.inTransition = true;
        particle.speedX = 0;
        particle.speedY = 0;
      });
    }, 50);
  };

  // Reset particles to original state
  const resetParticles = () => {
    particles.current.forEach(particle => {
      particle.targetX = null;
      particle.targetY = null;
      particle.inTransition = false;
      particle.speedX = particle.originalSpeedX;
      particle.speedY = particle.originalSpeedY;
    });
    setActiveAdvantage(null);
  };

  // Initialize refs array for cards
  useEffect(() => {
    detailRefs.current = Array(advantages.length).fill(null).map((_, i) => detailRefs.current[i] || null);
  }, [advantages.length]);

  return (
    <section ref={sectionRef} className="benefits-section relative w-full min-h-screen py-16 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {title || "I Vantaggi di ABBS"}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle || "Con ABBS, ottieni una piattaforma che non solo gestisce i tuoi abbonamenti, ma ti aiuta a ottimizzare i profitti e migliorare l'efficienza operativa in modo intelligente e sicuro."}
          </p>
          <p className="text-gray-400 text-sm mt-4">Clicca sulle aree per esplorare</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
          {advantages.map((advantage, index) => (
            <div
              key={`advantage-${index}`}
              className="relative p-6 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
              onClick={() => showAdvantageDetail(index)}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-full mr-4 flex items-center justify-center"
                  style={{ backgroundColor: `${advantage.color}20` }}
                >
                  <div style={{ color: advantage.color }}>
                    {React.cloneElement(advantage.icon as React.ReactElement, { stroke: advantage.color })}
                  </div>
                </div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: advantage.color }}
                >
                  {advantage.title}
                </h3>
              </div>
              
              <p className="text-gray-300 ml-16">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detail cards */}
      {advantages.map((advantage, index) => (
        <div
          key={`detail-${index}`}
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-500 ${activeAdvantage === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={resetParticles}
        >
          <div 
            ref={el => {
              detailRefs.current[index] = el;
            }}
            className="relative bg-black/80 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-md w-full z-10 animate-fadeIn border-2"
            style={{ borderColor: advantage.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-6">
              <div 
                className="p-4 rounded-full mr-4 flex items-center justify-center"
                style={{ backgroundColor: `${advantage.color}20` }}
              >
                <div style={{ color: advantage.color }}>
                  {React.cloneElement(advantage.icon as React.ReactElement, { stroke: advantage.color, size: 28 })}
                </div>
              </div>
              <h3 
                className="text-2xl font-bold m-0"
                style={{ color: advantage.color }}
              >
                {advantage.title}
              </h3>
            </div>
            
            <p className="text-gray-200 my-4 leading-relaxed">
              {advantage.description}
            </p>
            
            <div className="flex justify-between mt-8">
              <button 
                className="px-6 py-2 text-white text-sm font-medium rounded-md transition-all hover:translate-y-px hover:shadow-lg"
                style={{ 
                  backgroundColor: advantage.color,
                  boxShadow: `0 0 15px ${advantage.color}40`
                }}
              >
                Scopri di più
              </button>
              <button 
                className="px-6 py-2 text-white/80 text-sm font-medium border border-white/50 bg-transparent rounded-md transition-all hover:bg-white/10 hover:translate-y-px"
                onClick={(e) => {
                  e.stopPropagation();
                  resetParticles();
                }}
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;