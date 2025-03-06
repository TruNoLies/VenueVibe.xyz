import { VenueDirectory } from './types';

export interface VenueFilters {
  category?: string;
  city?: string;
  capacity?: {
    min?: number;
    max?: number;
  };
  features?: string[];
}

export function filterVenues(venues: VenueDirectory[], filters: VenueFilters): VenueDirectory[] {
  return venues.filter(venue => {
    const matchesCategory = !filters.category || venue.category === filters.category;
    const matchesCity = !filters.city || venue.location.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesCapacity = (!filters.capacity?.min || venue.capacity >= filters.capacity.min) &&
                           (!filters.capacity?.max || venue.capacity <= filters.capacity.max);
    const matchesFeatures = !filters.features?.length || 
                           filters.features.every(feature => venue.features.includes(feature));

    return matchesCategory && matchesCity && matchesCapacity && matchesFeatures;
  });
}