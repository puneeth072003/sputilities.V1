import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spotify-black disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    default: 'bg-spotify-dark border-gray-600 text-white placeholder-gray-400 focus:border-spotify-green focus:ring-spotify-green',
    filled: 'bg-gray-700 border-transparent text-white placeholder-gray-400 focus:bg-spotify-dark focus:border-spotify-green focus:ring-spotify-green',
    outline: 'bg-transparent border-gray-600 text-white placeholder-gray-400 focus:border-spotify-green focus:ring-spotify-green',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className={clsx('space-y-1', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={clsx(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            errorClasses,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            fullWidth && 'w-full',
            className
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
