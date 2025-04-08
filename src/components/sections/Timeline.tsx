"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";
import React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import "./Timeline.scss";

// Types
type TimelineItem = {
  date: string;
  heading: string;
  description: string;
  buttons: {
    title: string;
    variant?: string;
    href?: string;
  }[];
};

type Props = {
  items?: TimelineItem[];
};

const Timeline = (props: Props) => {
  const { t } = useLanguage();
  
  // Default data for our timeline
  const TimelineDefaults: Props = {
    items: [
      {
          date: t('timelineQ2_2023'),
          heading: t('timelineResearchPlanning'),
          description: t('timelineResearchPlanningDesc'),
          buttons: [
          { title: t('timelineDetails'), variant: "secondary", href: "#mission" }
        ]
      },
      {
          date: t('timelineQ3_2023'),
          heading: t('timelineMVPDevelopment'),
          description: t('timelineMVPDevelopmentDesc'),
          buttons: [
          { title: t('timelineLearnMore'), variant: "secondary", href: "#what" }
        ]
      },
      {
          date: t('timelineQ4_2023'),
          heading: t('timelineBetaTesting'),
          description: t('timelineBetaTestingDesc'),
          buttons: [
          { title: t('timelineExploreMore'), variant: "secondary", href: "#contact" }
        ]
      },
      {
          date: t('timelineQ1_2024'),
          heading: t('timelineMobileAppLaunch'),
          description: t('timelineMobileAppLaunchDesc'),
          buttons: [
          { title: t('timelinePreview'), variant: "secondary", href: "#team" }
        ]
      },
      {
          date: t('timelineQ2_2024'),
          heading: t('timelineInternationalExpansion'),
          description: t('timelineInternationalExpansionDesc'),
          buttons: [
          { title: t('timelineLearnMore'), variant: "secondary", href: "#waiting-list" }
        ]
      }
    ]
  };

  const { items = [] } = {
    ...TimelineDefaults,
    ...props,
  };

  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { 
    margin: "-40% 0px -40% 0px", // Increased margin for earlier detection
    once: false 
  });

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Track scroll position within section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create transforms for effects - Faster entry transition
  const videoOpacity = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.1, 0.15, 0.75, 0.85, 0.95], 
    [0, 0, 0.5, 1, 1, 0, 0]
  );
  
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.75, 0.85, 0.95],
    [1.1, 1.1, 1, 1, 1.1, 1.1]
  );
  
  const videoBlur = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.75, 0.85, 0.95],
    ["8px", "8px", "2px", "2px", "8px", "8px"]
  );

  // Title opacity for fixed title - Faster fade in
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.85, 0.9],
    [0, 1, 1, 0]
  );

  // Set active timeline item based on scroll position - show each item one at a time
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Only show items when video is fully visible
      if (value < 0.2 || value > 0.85) {
        setActiveItemIndex(-1);
        return;
      }
      
      // Divide the visible scroll range (0.2-0.85 = 0.65) by the number of items
      // to determine equal segments for each item
      const visibleScrollRange = 0.65;
      const segmentSize = visibleScrollRange / items.length;
      
      // Calculate which segment we're in based on the current scroll progress
      for (let i = 0; i < items.length; i++) {
        const segmentStart = 0.2 + (i * segmentSize);
        const segmentEnd = segmentStart + segmentSize;
        
        if (value >= segmentStart && value < segmentEnd) {
          setActiveItemIndex(i);
          break;
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  // Play/pause video
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section id="timeline" className={`timeline-section ${isMobile ? 'timeline-section--mobile' : ''}`} ref={sectionRef}>
      <motion.div 
        className="video-container"
        style={{ 
          opacity: videoOpacity
        }}
      >
        <motion.div 
          className="video-wrapper"
          style={{
            scale: videoScale,
            filter: `blur(${videoBlur})`
          }}
        >
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="background-video"
          >
            <source src="https://cdn.abbs.one/videos/roadmap.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        <div className="video-overlay"></div>
      </motion.div>

      {/* Fixed section title */}
      <motion.div 
        className="section-title-container"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="section-title">{t('timelineTitle')}</h2>
      </motion.div>

      <div className="timeline-content">
        {isInView && (
          <div className="timeline-progress">
            {items.map((_, index) => (
              <div 
                key={index}
                className={`timeline-dot ${index <= activeItemIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
        
        <div className="timeline-items">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === activeItemIndex ? 1 : 0,
                y: index === activeItemIndex ? 0 : (isMobile ? 30 : 50),
                scale: index === activeItemIndex ? 1 : 0.95
              }}
              transition={{ 
                opacity: { duration: 0.5, ease: "easeInOut" },
                y: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 0.5, ease: "easeInOut" }
              }}
              style={{
                position: 'absolute',
                display: index === activeItemIndex || (index === activeItemIndex - 1 && !isMobile) ? 'flex' : 'none'
              }}
            >
              <div className="timeline-item-date">{item.date}</div>
              <h2 className="timeline-item-heading">{item.heading}</h2>
              <p className="timeline-item-description">{item.description}</p>
              <div className="timeline-item-buttons">
                {item.buttons.map((button, idx) => (
                  <Button 
                    key={idx} 
                    variant={button.variant as any || "primary"}
                    href={button.href}
                  >
                      {button.title}
                    </Button>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline; 