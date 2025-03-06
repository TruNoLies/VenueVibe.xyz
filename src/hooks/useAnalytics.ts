import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageLoad } from '../lib/utils/analytics';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    trackPageLoad();
  }, [location.pathname]);
}