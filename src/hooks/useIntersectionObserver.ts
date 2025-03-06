import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<Element>();
  const frozen = useRef(false);

  const unfreezeAndObserve = () => {
    frozen.current = false;
    observe();
  };

  const observe = () => {
    if (elementRef.current && !frozen.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);
          setIsVisible(entry.isIntersecting);
          
          if (freezeOnceVisible && entry.isIntersecting) {
            frozen.current = true;
            observer.unobserve(elementRef.current!);
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  };

  useEffect(observe, [elementRef.current, threshold, root, rootMargin]);

  return {
    ref: elementRef,
    entry,
    isVisible,
    unfreeze: unfreezeAndObserve
  };
}