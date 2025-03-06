import { useState, useEffect } from 'react';
import { preloadImage } from '../lib/utils/performance';

export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoaded(false);
    setError(null);

    preloadImage(src)
      .then(() => setIsLoaded(true))
      .catch(err => setError(err));
  }, [src]);

  return { isLoaded, error };
}