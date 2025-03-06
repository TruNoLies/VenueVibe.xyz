import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { defaultMapConfig } from '../../lib/maps/config';
import { Card } from '../ui/Card';
import { Map } from 'lucide-react';

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    ...defaultMapConfig
  });

  // Show placeholder for missing or invalid API key
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Map className="h-12 w-12 text-yellow-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-100">Maps Configuration Required</h3>
              <p className="text-gray-400 text-sm mt-2">
                Please add your Google Maps API key to the environment variables.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Set VITE_GOOGLE_MAPS_API_KEY in your .env file
              </p>
            </div>
          </div>
        </Card>
        {children}
      </div>
    );
  }

  // Handle API load errors
  if (loadError) {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Map className="h-12 w-12 text-red-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-100">Maps Error</h3>
              <p className="text-gray-400 text-sm mt-2">
                {loadError.message.includes('RefererNotAllowed') 
                  ? 'Google Maps API key is not configured for this domain. Please update your API key settings.'
                  : 'Failed to load Google Maps. Please check your API key configuration.'}
              </p>
            </div>
          </div>
        </Card>
        {children}
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary" />
      </div>
    );
  }

  return <>{children}</>;
}