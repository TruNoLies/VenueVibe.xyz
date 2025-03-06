import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface GeolocationState {
  coordinates: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: 'Geolocation is not supported by your browser',
        loading: false
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null,
          loading: false
        });
      },
      (error) => {
        let message = 'Failed to get location';
        
        switch (error.code) {
          case 1:
            message = 'Location access denied. Please enable location services to find venues near you.';
            break;
          case 2:
            message = 'Location unavailable. Please try again later.';
            break;
          case 3:
            message = 'Location request timed out. Please try again.';
            break;
        }

        setState({
          coordinates: null,
          error: message,
          loading: false
        });

        // Only show toast for permission denied
        if (error.code === 1) {
          toast.error(message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return state;
}