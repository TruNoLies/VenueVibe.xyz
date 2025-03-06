import { supabase } from './supabase';

export interface VenueFilters {
  search?: string;
  genre?: string;
  sortBy?: 'rating' | 'complaints';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export async function fetchVenues(filters: VenueFilters = {}) {
  let query = supabase
    .from('venues')
    .select('*');

  if (filters.sortBy) {
    query = query.order(
      filters.sortBy === 'rating' ? 'average_rating' : 'complaint_score',
      { ascending: filters.sortBy === 'complaints' }
    );
  }

  const { data, error } = await query;
  if (error) throw error;

  // Client-side filtering for search and genre
  return data.filter(venue => {
    const matchesSearch = !filters.search || 
      venue.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      venue.location.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesGenre = !filters.genre || 
      filters.genre === 'All Genres' ||
      venue.genre_preferences.includes(filters.genre);

    return matchesSearch && matchesGenre;
  });
}