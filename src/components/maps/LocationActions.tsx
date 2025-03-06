import React from 'react';
import { Navigation, MapPin, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { getDirectionsUrl } from '../../lib/maps/directions';

interface LocationActionsProps {
  venue: {
    name: string;
    location: {
      coordinates: {
        lat: number;
        lng: number;
      };
      address: string;
    };
  };
  userLocation?: {
    lat: number;
    lng: number;
  };
}

export function LocationActions({ venue, userLocation }: LocationActionsProps) {
  const handleGetDirections = () => {
    const url = getDirectionsUrl(
      venue.location.coordinates,
      userLocation
    );
    window.open(url, '_blank');
  };

  const handleCopyLocation = async () => {
    try {
      await navigator.share({
        title: venue.name,
        text: `Check out ${venue.name}`,
        url: getDirectionsUrl(venue.location.coordinates)
      });
    } catch (err) {
      // Fallback to copying address to clipboard
      navigator.clipboard.writeText(venue.location.address);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleGetDirections}
        className="flex items-center gap-2"
      >
        <Navigation className="h-4 w-4" />
        Get Directions
      </Button>
      
      <Button
        variant="secondary"
        onClick={handleCopyLocation}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share Location
      </Button>
    </div>
  );
}