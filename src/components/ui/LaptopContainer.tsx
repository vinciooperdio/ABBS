import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './LaptopContainer.scss';

interface LaptopContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const LaptopContainer: React.FC<LaptopContainerProps> = ({ children, isVisible }) => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      // Start the opening animation after the component is visible
      const openLaptop = async () => {
        await controls.start("visible");
        // Delay opening to create a nice sequence
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      };
      
      openLaptop();
    } else {
      setIsOpen(false);
      controls.start("hidden");
    }
  }, [isVisible, controls]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };
  
  const screenVariants = {
    closed: { 
      rotateX: 90,
      originY: 1,
    },
    open: { 
      rotateX: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1],
        delay: 0.3
      } 
    }
  };
  
  return (
    <motion.div 
      className="laptop-container"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="laptop">
        <motion.div 
          className="laptop-screen"
          variants={screenVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <div className="laptop-screen-content">
            <div className="laptop-screen-frame">
              <div className="laptop-camera" />
              <div className="laptop-screen-inner">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="laptop-base">
          <div className="laptop-keyboard">
            <div className="laptop-touchpad" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaptopContainer; 