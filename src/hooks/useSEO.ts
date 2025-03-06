import { useEffect } from 'react';
import { updateMetaTags, SEOProps } from '../lib/utils/seo';

export function useSEO(props: SEOProps) {
  useEffect(() => {
    updateMetaTags(props);
  }, [props]);
}