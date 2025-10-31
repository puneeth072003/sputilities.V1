import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Progress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const variantClasses = {
    default: 'bg-spotify-green',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    gradient: 'bg-gradient-to-r from-spotify-green to-green-400',
  };

  return (
    <div className={clsx('w-full', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">
            {label || 'Progress'}
          </span>
          {showLabel && (
            <span className="text-sm text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={clsx(
        'w-full bg-gray-700 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default Progress;
