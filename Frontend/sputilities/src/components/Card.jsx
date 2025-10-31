import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-lg border transition-all duration-200';

  const variantClasses = {
    default: 'bg-spotify-dark border-gray-800 shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md border-white/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-spotify-green/20 to-transparent border-spotify-green/30',
    elevated: 'bg-spotify-dark border-gray-700 shadow-2xl',
    outline: 'bg-transparent border-gray-600',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-gray-700' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';

  const Component = clickable ? motion.div : 'div';
  const motionProps = clickable ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  } : {};

  return (
    <Component
      className={clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
