import React from 'react';
import classNames from 'classnames';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isGlow?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
  isGlow = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  const buttonClasses = classNames(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--disabled': disabled,
      'button--full-width': fullWidth,
      'glow': isGlow,
      'button--with-icon': icon,
      [`button--icon-${iconPosition}`]: icon,
    },
    className
  );

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="button__icon">{icon}</span>}
      <span className="button__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="button__icon">{icon}</span>}
    </>
  );

  // Handle internal links with smooth scrolling
  const handleClick = (e: React.MouseEvent) => {
    if (href && href.startsWith('#') && !href.startsWith('http')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    
    // Call the provided onClick handler if it exists
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 