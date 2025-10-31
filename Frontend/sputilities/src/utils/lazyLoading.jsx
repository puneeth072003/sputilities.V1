import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Enhanced lazy loading with error boundaries and custom loading states
export const createLazyComponent = (importFn, options = {}) => {
  const {
    fallback = <LoadingSpinner size="large" text="Loading..." />,
    errorFallback = null,
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  // Retry logic for failed imports
  const retryImport = async (attempt = 1) => {
    try {
      return await importFn();
    } catch (error) {
      if (attempt < retryCount) {
        console.warn(`Failed to load component (attempt ${attempt}/${retryCount}), retrying...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        return retryImport(attempt + 1);
      }
      throw error;
    }
  };

  const LazyComponent = lazy(retryImport);

  return (props) => (
    <ErrorBoundary fallback={errorFallback} level="component">
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Preload component for better UX
export const preloadComponent = (importFn) => {
  const componentImport = importFn();
  return componentImport;
};

// Lazy load with intersection observer for viewport-based loading
export const createIntersectionLazyComponent = (importFn, options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    fallback = <div className="h-32 bg-gray-800 animate-pulse rounded" />,
  } = options;

  return React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [hasLoaded, setHasLoaded] = React.useState(false);
    const elementRef = React.useRef();

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        },
        { rootMargin, threshold }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [rootMargin, threshold, hasLoaded]);

    if (!isVisible) {
      return <div ref={elementRef}>{fallback}</div>;
    }

    const LazyComponent = createLazyComponent(importFn);
    return <LazyComponent ref={ref} {...props} />;
  });
};

// Image lazy loading with blur effect
export const LazyImage = ({ src, alt, className = '', placeholder, ...props }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          {placeholder || <div className="w-8 h-8 bg-gray-600 rounded" />}
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};

// Lazy load routes with preloading on hover
export const createLazyRoute = (importFn, preloadOnHover = true) => {
  let componentPromise = null;

  const LazyComponent = lazy(() => {
    if (!componentPromise) {
      componentPromise = importFn();
    }
    return componentPromise;
  });

  const RouteComponent = (props) => (
    <ErrorBoundary level="page">
      <Suspense fallback={
        <div className="min-h-screen bg-spotify-black flex items-center justify-center">
          <LoadingSpinner size="large" text="Loading page..." />
        </div>
      }>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );

  // Add preload method
  RouteComponent.preload = () => {
    if (!componentPromise) {
      componentPromise = importFn();
    }
    return componentPromise;
  };

  return RouteComponent;
};

// Hook for managing lazy loading state
export const useLazyLoading = (importFn, trigger = true) => {
  const [Component, setComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!trigger) return;

    setLoading(true);
    setError(null);

    importFn()
      .then(module => {
        setComponent(() => module.default || module);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [importFn, trigger]);

  return { Component, loading, error };
};

// Utility to check if component should be lazy loaded
export const shouldLazyLoad = () => {
  // Don't lazy load on slow connections
  if (navigator.connection?.effectiveType === 'slow-2g' || navigator.connection?.effectiveType === '2g') {
    return false;
  }
  
  // Don't lazy load if user prefers reduced data usage
  if (navigator.connection?.saveData) {
    return false;
  }
  
  return true;
};

// Bundle splitting utilities
export const createChunkName = (name) => {
  return `/* webpackChunkName: "${name}" */`;
};

// Preload critical routes
export const preloadCriticalRoutes = () => {
  // Preload dashboard and playlist manager as they're likely to be accessed first
  if (shouldLazyLoad()) {
    setTimeout(() => {
      import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard');
      import(/* webpackChunkName: "playlist-manager" */ '../pages/PlaylistManager');
    }, 2000);
  }
};

export default {
  createLazyComponent,
  preloadComponent,
  createIntersectionLazyComponent,
  LazyImage,
  createLazyRoute,
  useLazyLoading,
  shouldLazyLoad,
  preloadCriticalRoutes,
};
