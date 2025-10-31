import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;

  const isBreakpoint = (breakpoint) => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBetween = (min, max) => {
    return windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max];
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    isBetween,
    breakpoints,
  };
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export const usePreferredColorScheme = () => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

export const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

export const useHighContrast = () => {
  return useMediaQuery('(prefers-contrast: high)');
};

export default useResponsive;
