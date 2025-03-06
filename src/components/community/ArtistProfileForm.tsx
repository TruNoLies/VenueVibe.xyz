import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ArtistProfileFormProps {
  initialData?: {
    name: string;
    bio?: string;
    location?: string;
    genres?: string[];
    experience?: string;
    achievements?: string[];
  };
  onSubmit: (data: any) => Promise<void>;
}

export function ArtistProfileForm({ initialData, onSubmit }: ArtistProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    bio: initialData?.bio || '',
    location: initialData?.location || '',
    genres: initialData?.genres?.join(', ') || '',
    experience: initialData?.experience || '',
    achievements: initialData?.achievements?.join('\n') || ''
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        genres: formData.genres.split(',').map(g => g.trim()).filter(Boolean),
        achievements: formData.achievements.split('\n').filter(Boolean)
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Artist Name
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Tell us about yourself and your music..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genres
          </label>
          <Input
            value={formData.genres}
            onChange={(e) => setFormData(prev => ({ ...prev, genres: e.target.value }))}
            placeholder="Rock, Jazz, Blues (comma separated)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Performance Experience
          </label>
          <textarea
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Share your performance history and experience..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Achievements
          </label>
          <textarea
            value={formData.achievements}
            onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="List your achievements (one per line)"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </Card>
  );
}