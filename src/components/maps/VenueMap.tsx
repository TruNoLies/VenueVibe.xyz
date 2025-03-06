import React from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/Card';

interface VenueMapProps {
  venues: Array<{
    id: string;
    name: string;
    location: {
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  }>;
  onVenueSelect?: (venueId: string) => void;
}

export function VenueMap({ venues, onVenueSelect }: VenueMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // If no valid API key, show a list view instead
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <Card className="p-4">
        <div className="space-y-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              onClick={() => onVenueSelect?.(venue.id)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-200 cursor-pointer transition-colors"
            >
              <MapPin className="h-5 w-5 text-neon-primary" />
              <span className="font-medium text-gray-100">{venue.name}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // If API key exists but map isn't loaded, show loading state
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <MapPin className="h-12 w-12 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-100">Loading Map</h3>
          <p className="text-gray-400 text-sm mt-2">
            Please wait while we load the venue locations...
          </p>
        </div>
      </div>
    </Card>
  );
}