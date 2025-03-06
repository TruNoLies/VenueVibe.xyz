import React from 'react';
import { MapPin, Star, Trash2, Users, Music } from 'lucide-react';

interface VenueHeaderProps {
  name: string;
  location: string;
  capacity: number;
  averageRating: number;
  complaintScore: number;
  genrePreferences: string[];
  imageUrl?: string;
}

export function VenueHeader({
  name,
  location,
  capacity,
  averageRating,
  complaintScore,
  genrePreferences,
  imageUrl = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
}: VenueHeaderProps) {
  return (
    <div className="relative mb-8">
      <div className="h-64 w-full relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent rounded-lg" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h1 className="text-4xl font-bold text-white mb-4">{name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-gray-200">
            <MapPin className="h-5 w-5" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-200">
            <Users className="h-5 w-5" />
            <span>{capacity} capacity</span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-white">{averageRating.toFixed(1)} rating</span>
          </div>

          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-400" />
            <span className="font-medium text-white">{complaintScore.toFixed(1)} complaints</span>
          </div>
        </div>

        {genrePreferences.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Music className="h-5 w-5 text-neon-primary" />
            <div className="flex gap-2">
              {genrePreferences.map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 rounded-full text-sm bg-dark-200 text-gray-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}