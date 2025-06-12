import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './NebulaBackground.scss';

const NebulaBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="nebula-background" ref={containerRef}>
      {/* Strati di atmosfera rotanti */}
      <motion.div 
        className="atmosphere-layer"
        animate={{ 
          rotate: 360 
        }}
        initial={{ rotate: 0 }}
        transition={{ 
          duration: 120, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="atmosphere-gradient atmosphere-gradient-1"></div>
      </motion.div>
      
      <motion.div 
        className="atmosphere-layer"
        animate={{ 
          rotate: -360 
        }}
        initial={{ rotate: 0 }}
        transition={{ 
          duration: 180, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="atmosphere-gradient atmosphere-gradient-2"></div>
      </motion.div>
      
      <motion.div 
        className="atmosphere-layer"
        animate={{ 
          rotate: 360
        }}
        initial={{ rotate: 0 }}
        transition={{ 
          duration: 150, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="atmosphere-gradient atmosphere-gradient-3"></div>
      </motion.div>
    </div>
  );
};

export default NebulaBackground; 