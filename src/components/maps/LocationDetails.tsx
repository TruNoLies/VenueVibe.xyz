import React from 'react';
import { MapPin, Clock, Phone, Globe, Navigation } from 'lucide-react';
import { Card } from '../ui/Card';

interface LocationDetailsProps {
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  website?: string;
  distance?: number;
  onGetDirections?: () => void;
}

export function LocationDetails({
  name,
  address,
  hours,
  phone,
  website,
  distance,
  onGetDirections
}: LocationDetailsProps) {
  function handleGetDirections() {
    if (onGetDirections) {
      onGetDirections();
    } else {
      // Fallback to Apple Maps on iOS, Google Maps on other platforms
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const mapsUrl = isIOS
        ? `http://maps.apple.com/?q=${encodeURIComponent(address)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(mapsUrl, '_blank');
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-100">{name}</h3>
          <div className="flex items-center gap-2 text-gray-400 mt-1">
            <MapPin className="h-4 w-4" />
            <span>{address}</span>
          </div>
        </div>
        {distance && (
          <span className="text-sm text-neon-primary">
            {distance.toFixed(1)} km away
          </span>
        )}
      </div>

      <div className="space-y-2 text-gray-300">
        {hours && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{hours}</span>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${phone}`} className="hover:text-neon-primary">
              {phone}
            </a>
          </div>
        )}
        
        {website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-primary"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>

      <button
        onClick={handleGetDirections}
        className="flex items-center gap-2 text-neon-primary hover:text-neon-secondary transition-colors"
      >
        <Navigation className="h-4 w-4" />
        Get Directions
      </button>
    </Card>
  );
}