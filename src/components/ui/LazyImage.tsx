import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useImagePreload } from '../../hooks/useImagePreload';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: React.ReactNode;
  aspectRatio?: number;
}

export function LazyImage({
  src,
  alt,
  className,
  fallback,
  aspectRatio,
  ...props
}: LazyImageProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true
  });
  const { isLoaded, error } = useImagePreload(isVisible ? src : '');

  const style = aspectRatio 
    ? { aspectRatio: `${aspectRatio}`, objectFit: 'cover' as const }
    : undefined;

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
      style={style}
    >
      {isVisible && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}
        </>
      )}
    </div>
  );
}