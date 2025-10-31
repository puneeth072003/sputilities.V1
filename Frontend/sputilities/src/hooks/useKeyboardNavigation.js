import { useEffect, useCallback, useState } from 'react';

export const useKeyboardNavigation = (options = {}) => {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onShiftTab,
    enabled = true,
    preventDefault = true,
  } = options;

  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;

    const { key, shiftKey, ctrlKey, metaKey } = event;

    // Prevent default behavior if specified
    const shouldPreventDefault = preventDefault && [
      'Escape',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ].includes(key);

    if (shouldPreventDefault) {
      event.preventDefault();
    }

    switch (key) {
      case 'Escape':
        onEscape?.(event);
        break;
      case 'Enter':
        onEnter?.(event);
        break;
      case 'ArrowUp':
        onArrowUp?.(event);
        break;
      case 'ArrowDown':
        onArrowDown?.(event);
        break;
      case 'ArrowLeft':
        onArrowLeft?.(event);
        break;
      case 'ArrowRight':
        onArrowRight?.(event);
        break;
      case 'Tab':
        if (shiftKey) {
          onShiftTab?.(event);
        } else {
          onTab?.(event);
        }
        break;
    }
  }, [
    enabled,
    preventDefault,
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onShiftTab,
  ]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);

  return { handleKeyDown };
};

export const useFocusTrap = (containerRef, isActive = true) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
};

export const useArrowNavigation = (items, options = {}) => {
  const {
    loop = true,
    orientation = 'vertical',
    onSelect,
    initialIndex = 0,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const navigate = useCallback((direction) => {
    if (!items.length) return;

    let newIndex;
    
    if (orientation === 'vertical') {
      if (direction === 'up') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? items.length - 1 : 0);
      } else if (direction === 'down') {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (loop ? 0 : items.length - 1);
      }
    } else {
      if (direction === 'left') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? items.length - 1 : 0);
      } else if (direction === 'right') {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (loop ? 0 : items.length - 1);
      }
    }

    if (newIndex !== undefined) {
      setCurrentIndex(newIndex);
      onSelect?.(items[newIndex], newIndex);
    }
  }, [currentIndex, items, loop, orientation, onSelect]);

  const keyboardHandlers = {
    onArrowUp: () => navigate('up'),
    onArrowDown: () => navigate('down'),
    onArrowLeft: () => navigate('left'),
    onArrowRight: () => navigate('right'),
    onEnter: () => onSelect?.(items[currentIndex], currentIndex),
  };

  useKeyboardNavigation(keyboardHandlers);

  return {
    currentIndex,
    setCurrentIndex,
    navigate,
  };
};

export default useKeyboardNavigation;
