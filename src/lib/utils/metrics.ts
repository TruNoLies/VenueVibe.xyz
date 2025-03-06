// Performance metrics tracking
export interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export function trackWebVitals(): void {
  if ('performance' in window) {
    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const metric = entry.toJSON();
        console.info(`Web Vital: ${entry.name}`, metric);
        // Send to analytics service
      });
    });

    observer.observe({ 
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
    });
  }
}

// Error tracking
export function trackError(error: Error, context?: Record<string, any>): void {
  console.error('Application Error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context
  });
  // Send to error tracking service
}