import { supabase } from './supabase';

export interface ReviewFilters {
  rating?: number;
  sortBy?: 'latest' | 'oldest';
  venueId?: string;
}

export async function fetchReviews(filters: ReviewFilters = {}) {
  let query = supabase
    .from('reviews')
    .select(`
      *,
      venues (name, location),
      profiles (name)
    `);

  if (filters.rating) {
    query = query.gte('rating', filters.rating);
  }

  if (filters.venueId) {
    query = query.eq('venue_id', filters.venueId);
  }

  query = query.order('created_at', { 
    ascending: filters.sortBy === 'oldest'
  });

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function submitReview({
  venueId,
  userId,
  rating,
  complaintCount,
  comment
}: {
  venueId: string;
  userId: string;
  rating: number;
  complaintCount: number;
  comment: string;
}) {
  const { error } = await supabase.from('reviews').insert([{
    venue_id: venueId,
    user_id: userId,
    rating,
    complaint_count: complaintCount,
    comment
  }]);

  if (error) throw error;
}