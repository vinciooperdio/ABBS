import React from 'react';
import { motion } from 'framer-motion';
import './SimplifiedNebulaBackground.scss';

const SimplifiedNebulaBackground: React.FC = () => {
  return (
    <div className="simplified-nebula-background">
      <div className="glass-effect"></div>
      <div className="floating-shapes">
        <motion.div 
          className="shape shape-1"
          animate={{ 
            x: [0, 25, 0],
            y: [0, 25, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-2"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 25, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-3"
          animate={{ 
            x: [0, 15, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-4"
          animate={{ 
            x: [0, -20, 0],
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        
        {/* Forme aggiuntive */}
        <motion.div 
          className="shape shape-5"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-6"
          animate={{ 
            x: [0, -15, 0],
            y: [0, 35, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-7"
          animate={{ 
            x: [0, 25, 0],
            y: [0, 10, 0],
            rotate: [0, -7, 0]
          }}
          transition={{ 
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        ></motion.div>
        
        <motion.div 
          className="shape shape-8"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0],
            rotate: [0, 9, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default SimplifiedNebulaBackground; 