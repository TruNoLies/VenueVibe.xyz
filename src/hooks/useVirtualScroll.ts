import { useState, useEffect, useRef } from 'react';
import { throttle } from '../lib/utils/throttle';

interface UseVirtualScrollProps<T> {
  items: T[];
  itemHeight: number;
  overscan?: number;
  containerHeight: number;
}

export function useVirtualScroll<T>({
  items,
  itemHeight,
  overscan = 3,
  containerHeight,
}: UseVirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleData = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const onScroll = throttle((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, 16);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', onScroll);
      return () => container.removeEventListener('scroll', onScroll);
    }
  }, []);

  return {
    containerRef,
    visibleData,
    totalHeight,
    offsetY,
  };
}