import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

const Alert = ({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    danger: XCircle,
    info: Info,
  };

  const variantClasses = {
    success: 'bg-green-900/50 border-green-500 text-green-100',
    warning: 'bg-yellow-900/50 border-yellow-500 text-yellow-100',
    danger: 'bg-red-900/50 border-red-500 text-red-100',
    info: 'bg-blue-900/50 border-blue-500 text-blue-100',
  };

  const iconColors = {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
  };

  const Icon = icons[variant];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={clsx(
          'border rounded-lg p-4',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start">
          <Icon className={clsx('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', iconColors[variant])} />
          
          <div className="flex-1">
            {title && (
              <h4 className="font-medium mb-1">
                {title}
              </h4>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
          
          {dismissible && (
            <button
              onClick={onDismiss}
              className="ml-3 flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
