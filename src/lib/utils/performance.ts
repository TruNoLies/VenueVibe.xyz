// Performance optimization utilities
import { debounce } from './debounce';
import { throttle } from './throttle';

// Image loading optimization
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Batch preload images
export async function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

// Lazy loading helper
export function observeIntersection(
  element: Element,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { rootMargin: '50px' }
): () => void {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(element);
  return () => observer.disconnect();
}