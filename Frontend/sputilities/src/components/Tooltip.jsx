import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 500,
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = (e) => {
    if (disabled || !content) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let x, y;

    switch (position) {
      case 'top':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.top + scrollY - 8;
        break;
      case 'bottom':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.bottom + scrollY + 8;
        break;
      case 'left':
        x = rect.left + scrollX - 8;
        y = rect.top + scrollY + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollX + 8;
        y = rect.top + scrollY + rect.height / 2;
        break;
      default:
        x = rect.left + scrollX + rect.width / 2;
        y = rect.top + scrollY - 8;
    }

    setTooltipPosition({ x, y });

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getTooltipClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg border border-gray-700 max-w-xs';
    
    switch (position) {
      case 'top':
        return `${baseClasses} transform -translate-x-1/2 -translate-y-full`;
      case 'bottom':
        return `${baseClasses} transform -translate-x-1/2`;
      case 'left':
        return `${baseClasses} transform -translate-x-full -translate-y-1/2`;
      case 'right':
        return `${baseClasses} transform -translate-y-1/2`;
      default:
        return `${baseClasses} transform -translate-x-1/2 -translate-y-full`;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 bg-gray-900 border border-gray-700 transform rotate-45';
    
    switch (position) {
      case 'top':
        return `${baseClasses} left-1/2 -translate-x-1/2 -bottom-1 border-t-0 border-l-0`;
      case 'bottom':
        return `${baseClasses} left-1/2 -translate-x-1/2 -top-1 border-b-0 border-r-0`;
      case 'left':
        return `${baseClasses} top-1/2 -translate-y-1/2 -right-1 border-t-0 border-l-0`;
      case 'right':
        return `${baseClasses} top-1/2 -translate-y-1/2 -left-1 border-b-0 border-r-0`;
      default:
        return `${baseClasses} left-1/2 -translate-x-1/2 -bottom-1 border-t-0 border-l-0`;
    }
  };

  const tooltipContent = isVisible && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.15 }}
        className={getTooltipClasses()}
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
        }}
      >
        <div className={getArrowClasses()} />
        <div className="relative z-10">
          {typeof content === 'string' ? (
            <span>{content}</span>
          ) : (
            content
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={className}
      >
        {children}
      </div>
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
