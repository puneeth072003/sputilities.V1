import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Report error to monitoring service (if available)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    // This would typically send to a service like Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.props.userId || 'anonymous',
    };

    console.log('Error Report:', errorReport);
    
    // Example: Send to monitoring service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport),
    // });
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const { error, errorInfo, errorId } = this.state;
    const bugReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    };
    
    // Open bug report with pre-filled information
    const subject = encodeURIComponent(`Bug Report - Error ID: ${errorId}`);
    const body = encodeURIComponent(`
Error Details:
- Error ID: ${errorId}
- Message: ${error?.message}
- Component: ${this.props.componentName || 'Unknown'}
- URL: ${window.location.href}
- Timestamp: ${new Date().toISOString()}

Steps to reproduce:
1. 
2. 
3. 

Additional context:

Stack trace:
${error?.stack}
    `);
    
    window.open(`mailto:support@sputilities.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, level = 'page' } = this.props;
      
      // If a custom fallback is provided, use it
      if (Fallback) {
        return <Fallback error={this.state.error} retry={this.handleRetry} />;
      }

      // Different UI based on error level
      if (level === 'component') {
        return (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <div className="flex items-center space-x-2 text-red-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Component Error</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Something went wrong in this component.
            </p>
            <button
              onClick={this.handleRetry}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        );
      }

      // Full page error UI
      return (
        <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="bg-spotify-dark rounded-lg p-8 border border-gray-800">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-400 mb-6">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <details className="text-left mb-6 p-4 bg-gray-900 rounded border">
                  <summary className="text-red-400 cursor-pointer mb-2">
                    Error Details (Development)
                  </summary>
                  <div className="text-xs text-gray-300 space-y-2">
                    <div>
                      <strong>Error:</strong> {this.state.error?.message}
                    </div>
                    <div>
                      <strong>Error ID:</strong> {this.state.errorId}
                    </div>
                    {this.state.error?.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="mt-1 text-xs overflow-x-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-spotify-green hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Go Home</span>
                </button>

                <button
                  onClick={this.handleReportBug}
                  className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Bug className="w-4 h-4" />
                  <span>Report Bug</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Error ID: {this.state.errorId}
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
