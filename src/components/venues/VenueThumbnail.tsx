import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import { VenueDirectory } from '../../lib/venues/types';

interface VenueThumbnailProps {
  venue: VenueDirectory;
  className?: string;
  showCapacity?: boolean;
  showLocation?: boolean;
  linkTo?: string;
}

export function VenueThumbnail({
  venue,
  className = '',
  showCapacity = true,
  showLocation = true,
  linkTo
}: VenueThumbnailProps) {
  const content = (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      <img
        src={venue.images[0]}
        alt={venue.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{venue.name}</h3>
        <div className="space-y-1">
          {showLocation && (
            <div className="flex items-center text-gray-200">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {venue.location.city}, {venue.location.state}
              </span>
            </div>
          )}
          {showCapacity && (
            <div className="flex items-center text-gray-200">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">{venue.capacity} capacity</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block">
        {content}
      </Link>
    );
  }

  return content;
}