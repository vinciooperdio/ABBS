import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.scss';
import logo from '../../assets/images/abbslogo.svg';

const Footer = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const currentYear = new Date().getFullYear();
  const isHomePage = window.location.pathname === '/';
  
  const handleSectionLink = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (!isHomePage) {
      e.preventDefault();
      window.location.href = '/' + sectionId;
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer__gradient-circle footer__gradient-circle--1"></div>
      <div className="footer__gradient-circle footer__gradient-circle--2"></div>
      
      <div className="footer__container">
        <motion.div 
          className="footer__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="footer__brand">
            <img src={logo} alt="ABBS Logo" className="footer__logo" />
            <p className="footer__tagline">
              {t('revolutionizeDigitalIdentity')}
            </p>
          </motion.div>
          
          <div className="footer__links-container">
            <motion.div variants={itemVariants} className="footer__links">
              <h3>{t('navigation')}</h3>
              <ul>
                <li><a href="/">{t('home')}</a></li>
                <li><Link to="/business">{t('business')}</Link></li>
                <li><a href="#what-is" onClick={(e) => handleSectionLink(e, '#what-is')}>{t('whatIs')}</a></li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="footer__links">
              <h3>{t('sections')}</h3>
              <ul>
                <li><a href="#mission" onClick={(e) => handleSectionLink(e, '#mission')}>{t('mission')}</a></li>
                <li><a href="#team" onClick={(e) => handleSectionLink(e, '#team')}>{t('team')}</a></li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="footer__links">
              <h3>{t('legal')}</h3>
              <ul>
                <li><Link to="/terms">{t('termsOfService')}</Link></li>
                <li><Link to="/privacy">{t('privacyPolicy')}</Link></li>
                <li><Link to="/cookies">{t('cookiePolicy')}</Link></li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="footer__contact">
            <h3>{t('contactUs')}</h3>
            <p>{t('questionsLearnMore')}</p>
            <a href="mailto:founders@abbs.one" className="footer__contact-button">
              <FiMail />
              <span>{t('writeToUs')}</span>
            </a>
            
            <div className="footer__social">
              <a href="https://linkedin.com/company/abbsapp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://www.instagram.com/abbsapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.5 } }}
          viewport={{ once: true }}
        >
          <div className="footer__copyright">
            &copy; {currentYear} ABBS. {t('copyright')}
          </div>
          
          <div className="footer__made-with">
            {t('madeWithLove')} <FiHeart className="footer__heart" /> {t('inItaly')}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 