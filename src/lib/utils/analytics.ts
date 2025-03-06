// Analytics utility for tracking performance metrics
export function trackPageLoad() {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const metrics = {
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      timeToFirstByte: navigation.responseStart - navigation.requestStart,
      domLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      fullPageLoad: navigation.loadEventEnd - navigation.navigationStart,
    };
    
    // Log metrics (replace with your analytics service)
    console.info('Performance Metrics:', metrics);
  }
}