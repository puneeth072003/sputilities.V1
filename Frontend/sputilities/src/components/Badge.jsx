import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const variantClasses = {
    default: 'bg-gray-700 text-gray-300',
    primary: 'bg-spotify-green text-white',
    secondary: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
    info: 'bg-cyan-600 text-white',
    outline: 'border border-gray-600 text-gray-300 bg-transparent',
    'outline-primary': 'border border-spotify-green text-spotify-green bg-transparent',
    'outline-success': 'border border-green-600 text-green-400 bg-transparent',
    'outline-warning': 'border border-yellow-600 text-yellow-400 bg-transparent',
    'outline-danger': 'border border-red-600 text-red-400 bg-transparent',
  };

  const sizeClasses = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-0.5 text-xs',
    md: dot ? 'w-2.5 h-2.5' : 'px-2.5 py-0.5 text-xs',
    lg: dot ? 'w-3 h-3' : 'px-3 py-1 text-sm',
  };

  if (dot) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={clsx(
          'rounded-full',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
