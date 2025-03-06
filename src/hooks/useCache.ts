import { useState, useEffect } from 'react';
import { getCache, setCache } from '../lib/utils/cache';

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  expiry?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Try to get from cache first
        const cached = getCache<T>(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        // If not in cache, fetch fresh data
        const fresh = await fetcher();
        setCache(key, fresh, expiry);
        setData(fresh);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [key, expiry]);

  return { data, loading, error };
}