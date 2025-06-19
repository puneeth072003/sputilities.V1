// Performance monitoring and optimization utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true';
  }

  // Start timing a operation
  startTiming(name) {
    if (!this.isEnabled) return;
    
    this.metrics.set(name, {
      startTime: performance.now(),
      name,
    });
  }

  // End timing and log result
  endTiming(name) {
    if (!this.isEnabled) return;
    
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`No timing started for: ${name}`);
      return;
    }

    const duration = performance.now() - metric.startTime;
    const result = { ...metric, duration, endTime: performance.now() };
    
    this.metrics.set(name, result);
    
    // Log slow operations
    if (duration > 1000) {
      console.warn(`🐌 Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    } else if (duration > 100) {
      console.log(`⚠️ ${name} took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  // Measure component render time
  measureRender(componentName, renderFn) {
    if (!this.isEnabled) return renderFn();
    
    this.startTiming(`render-${componentName}`);
    const result = renderFn();
    this.endTiming(`render-${componentName}`);
    
    return result;
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntry('largest-contentful-paint', (entries) => {
      const lcp = entries[entries.length - 1];
      console.log(`📊 LCP: ${lcp.startTime.toFixed(2)}ms`);
      
      if (lcp.startTime > 2500) {
        console.warn('🚨 Poor LCP detected (>2.5s)');
      }
    });

    // First Input Delay (FID) - approximated with First Contentful Paint
    this.observePerformanceEntry('first-contentful-paint', (entries) => {
      const fcp = entries[entries.length - 1];
      console.log(`📊 FCP: ${fcp.startTime.toFixed(2)}ms`);
    });

    // Cumulative Layout Shift (CLS)
    this.observePerformanceEntry('layout-shift', (entries) => {
      let cls = 0;
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      
      if (cls > 0.1) {
        console.warn(`🚨 High CLS detected: ${cls.toFixed(4)}`);
      }
    });
  }

  // Generic performance observer
  observePerformanceEntry(type, callback) {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ type, buffered: true });
      this.observers.set(type, observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  // Monitor memory usage
  monitorMemory() {
    if (!this.isEnabled || !performance.memory) return;

    const memory = performance.memory;
    const memoryInfo = {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    };

    console.log(`💾 Memory: ${memoryInfo.used}MB / ${memoryInfo.total}MB (limit: ${memoryInfo.limit}MB)`);
    
    if (memoryInfo.used / memoryInfo.limit > 0.8) {
      console.warn('🚨 High memory usage detected');
    }

    return memoryInfo;
  }

  // Get all metrics
  getMetrics() {
    return Array.from(this.metrics.values());
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics.clear();
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const startRender = () => performanceMonitor.startTiming(`render-${componentName}`);
  const endRender = () => performanceMonitor.endTiming(`render-${componentName}`);

  return { startRender, endRender };
};

// HOC for automatic component performance monitoring
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  const name = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const MonitoredComponent = (props) => {
    return performanceMonitor.measureRender(name, () =>
      WrappedComponent(props)
    );
  };

  MonitoredComponent.displayName = `withPerformanceMonitoring(${name})`;
  return MonitoredComponent;
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (!performanceMonitor.isEnabled) return;
  
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  console.group('📦 Bundle Analysis');
  
  scripts.forEach(script => {
    const src = script.src;
    if (src.includes('static/js/')) {
      console.log(`JS: ${src.split('/').pop()}`);
    }
  });
  
  styles.forEach(style => {
    const href = style.href;
    if (href.includes('static/css/')) {
      console.log(`CSS: ${href.split('/').pop()}`);
    }
  });
  
  console.groupEnd();
};

// Network performance monitoring
export const monitorNetworkPerformance = () => {
  if (!performanceMonitor.isEnabled || !navigator.connection) return;
  
  const connection = navigator.connection;
  const networkInfo = {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
  
  console.log('🌐 Network:', networkInfo);
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    console.warn('🚨 Slow network detected - consider optimizing for low bandwidth');
  }
  
  return networkInfo;
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = () => {
  if (!performanceMonitor.isEnabled) return;
  
  console.log('🚀 Performance monitoring initialized');
  
  // Start monitoring
  performanceMonitor.observeWebVitals();
  
  // Monitor memory every 30 seconds
  setInterval(() => {
    performanceMonitor.monitorMemory();
  }, 30000);
  
  // Analyze bundle on load
  if (document.readyState === 'complete') {
    analyzeBundleSize();
    monitorNetworkPerformance();
  } else {
    window.addEventListener('load', () => {
      analyzeBundleSize();
      monitorNetworkPerformance();
    });
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.cleanup();
  });
};

export default performanceMonitor;
