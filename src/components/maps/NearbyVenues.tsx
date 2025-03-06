import React from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { calculateDistance, formatDistance } from '../../lib/maps/distance';

interface NearbyVenuesProps {
  venues: Array<{
    id: string;
    name: string;
    location: {
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  }>;
  userLocation: {
    lat: number;
    lng: number;
  };
  onVenueSelect: (venueId: string) => void;
}

export function NearbyVenues({ 
  venues, 
  userLocation, 
  onVenueSelect 
}: NearbyVenuesProps) {
  const sortedVenues = [...venues].sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.location.coordinates.lat,
      a.location.coordinates.lng
    );
    const distanceB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.location.coordinates.lat,
      b.location.coordinates.lng
    );
    return distanceA - distanceB;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">Nearby Venues</h3>
      
      <div className="grid gap-4">
        {sortedVenues.map((venue) => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            venue.location.coordinates.lat,
            venue.location.coordinates.lng
          );

          return (
            <Card
              key={venue.id}
              className="p-4 cursor-pointer hover:bg-dark-200 transition-colors"
              onClick={() => onVenueSelect(venue.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-neon-primary" />
                  <span className="font-medium">{venue.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {formatDistance(distance)}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}