import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spotify-black disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-spotify-green hover:bg-green-600 text-white focus:ring-spotify-green shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white focus:ring-spotify-green',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500',
    outline: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 focus:ring-gray-500',
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner 
            size={size === 'xs' || size === 'sm' ? 'small' : 'medium'} 
            color="white" 
            className="mr-2" 
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className={clsx('mr-2', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className={clsx('ml-2', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
