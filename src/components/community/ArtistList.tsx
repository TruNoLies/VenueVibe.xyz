import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, MapPin, Star } from 'lucide-react';
import { Card } from '../ui/Card';

interface ArtistListProps {
  artists: Array<{
    id: string;
    name: string;
    location?: string;
    genres?: string[];
    rating?: number;
    reviewCount?: number;
  }>;
}

export function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <Link key={artist.id} to={`/artists/${artist.id}`}>
          <Card className="p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-dark-200">
                <Music2 className="h-6 w-6 text-neon-primary" />
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-100 truncate">
                    {artist.name}
                  </h3>
                  {artist.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{artist.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {artist.location && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.location}</span>
                  </div>
                )}

                {artist.genres && artist.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {artist.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 rounded-full bg-dark-200 text-gray-300 text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                    {artist.genres.length > 3 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{artist.genres.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}