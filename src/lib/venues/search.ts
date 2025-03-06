import { VenueDirectory } from './types';
import { venueDirectory } from './directory';
import { filterVenues, VenueFilters } from './filters';
import { findNearbyVenues } from '../maps';

export async function searchVenues(
  query: string,
  filters: VenueFilters = {},
  coordinates?: { lat: number; lng: number }
): Promise<VenueDirectory[]> {
  let venues = venueDirectory;

  // Apply text search
  if (query) {
    venues = venues.filter(venue => 
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.location.city.toLowerCase().includes(query.toLowerCase()) ||
      venue.features.some(feature => 
        feature.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  // Apply category and other filters
  venues = filterVenues(venues, filters);

  // Apply location-based filtering if coordinates provided
  if (coordinates) {
    const nearbyVenueIds = await findNearbyVenues(coordinates);
    venues = venues.filter(venue => 
      nearbyVenueIds.includes(venue.id)
    );
  }

  return venues;
}