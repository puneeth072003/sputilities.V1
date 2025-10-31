import React from 'react';
import clsx from 'clsx';

const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
  ...props
}) => {
  const baseClasses = 'bg-gray-700';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Could be enhanced with a wave animation
    none: '',
  };

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={clsx(
        baseClasses,
        animationClasses[animation],
        variantClasses[variant],
        className
      )}
      style={style}
      {...props}
    />
  );
};

// Skeleton components for common use cases
export const SkeletonText = ({ lines = 1, className = '', ...props }) => (
  <div className={clsx('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '75%' : '100%'}
        {...props}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '', ...props }) => (
  <div className={clsx('card space-y-4', className)} {...props}>
    <Skeleton variant="rectangular" height="200px" />
    <div className="space-y-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
);

export const SkeletonPlaylist = ({ className = '', ...props }) => (
  <div className={clsx('flex items-center space-x-4 p-4', className)} {...props}>
    <Skeleton variant="rectangular" width="48px" height="48px" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" />
    </div>
    <Skeleton variant="circular" width="24px" height="24px" />
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4, className = '', ...props }) => (
  <div className={clsx('space-y-3', className)} {...props}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex items-center space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            width={colIndex === 0 ? '30%' : colIndex === columns - 1 ? '20%' : '25%'}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;
