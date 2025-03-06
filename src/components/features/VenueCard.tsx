import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Trash2, Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface VenueCardProps {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  capacity: number;
  averageRating?: number | null;
  complaintScore?: number | null;
  imageUrl?: string;
}

export function VenueCard({
  id,
  name,
  location,
  capacity,
  averageRating = 0,
  complaintScore = 0,
  imageUrl = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
}: VenueCardProps) {
  return (
    <Link to={`/venues/${id}`}>
      <Card className="group hover:scale-[1.02] transition-all duration-300">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          <div className="absolute top-3 right-3 bg-dark-100/90 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{Number(averageRating).toFixed(1)}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-primary transition-colors">
            {name}
          </h3>

          <div className="space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location.city}, {location.state}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{capacity} capacity</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dark-200">
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{Number(averageRating).toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-1.5 text-red-400">
                <Trash2 className="h-5 w-5" />
                <span className="font-medium">{Number(complaintScore).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}