import React from 'react';
import { Link } from 'react-router-dom';
import { VenueThumbnail } from './VenueThumbnail';
import { venueDirectory } from '../../lib/venues/directory';
import { venueCategories } from '../../lib/venues/categories';

interface VenueCategorySectionProps {
  categoryId: string;
}

export function VenueCategorySection({ categoryId }: VenueCategorySectionProps) {
  const category = venueCategories.find(c => c.id === categoryId);
  const venues = venueDirectory.filter(v => v.category === categoryId).slice(0, 3);

  if (!category || venues.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">{category.name}</h2>
          <p className="text-gray-400">{category.description}</p>
        </div>
        <Link
          to={`/venues?category=${categoryId}`}
          className="text-neon-primary hover:text-neon-secondary transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueThumbnail
            key={venue.id}
            venue={venue}
            className="h-64"
            linkTo={`/venues/${venue.id}`}
          />
        ))}
      </div>
    </section>
  );
}