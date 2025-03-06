import React from 'react';
import { Music2, MapPin, Calendar, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface ArtistProfileProps {
  profile: {
    id: string;
    name: string;
    bio?: string;
    location?: string;
    genres?: string[];
    experience?: string;
    achievements?: string[];
    rating?: number;
    reviewCount?: number;
  };
  onMessageClick?: (userId: string) => void;
}

export function ArtistProfile({ profile, onMessageClick }: ArtistProfileProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-dark-200">
            <Music2 className="h-8 w-8 text-neon-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{profile.name}</h3>
            {profile.location && (
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {profile.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">{profile.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">
              ({profile.reviewCount} reviews)
            </span>
          </div>
        )}
      </div>

      {profile.bio && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">About</h4>
          <p className="text-gray-400">{profile.bio}</p>
        </div>
      )}

      {profile.genres && profile.genres.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {profile.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 rounded-full bg-dark-200 text-gray-300 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.experience && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Experience</h4>
          <p className="text-gray-400">{profile.experience}</p>
        </div>
      )}

      {profile.achievements && profile.achievements.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Achievements</h4>
          <ul className="list-disc list-inside text-gray-400">
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button onClick={() => onMessageClick?.(profile.id)}>
          Send Message
        </Button>
        <Link to={`/artists/${profile.id}/reviews`}>
          <Button variant="secondary">View Reviews</Button>
        </Link>
      </div>
    </Card>
  );
}