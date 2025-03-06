// Cache utility for storing and retrieving data
const CACHE_PREFIX = 'venuevibe:';
const DEFAULT_EXPIRY = 1000 * 60 * 5; // 5 minutes

interface CacheItem<T> {
  value: T;
  expiry: number;
}

export function setCache<T>(key: string, value: T, expiry = DEFAULT_EXPIRY): void {
  const item: CacheItem<T> = {
    value,
    expiry: Date.now() + expiry
  };
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
}

export function getCache<T>(key: string): T | null {
  const item = localStorage.getItem(CACHE_PREFIX + key);
  if (!item) return null;

  const { value, expiry } = JSON.parse(item) as CacheItem<T>;
  if (Date.now() > expiry) {
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }

  return value;
}

export function clearCache(prefix?: string): void {
  const searchPrefix = prefix ? CACHE_PREFIX + prefix : CACHE_PREFIX;
  Object.keys(localStorage)
    .filter(key => key.startsWith(searchPrefix))
    .forEach(key => localStorage.removeItem(key));
}