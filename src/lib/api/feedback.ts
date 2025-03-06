import { supabase } from '../supabase';
import { Feedback } from '../types/feedback';

export async function submitFeedback({
  venueId,
  userId,
  message,
  category,
  rating
}: {
  venueId: string;
  userId: string;
  message: string;
  category: string;
  rating: number;
}) {
  const { error } = await supabase.from('artist_feedback').insert([{
    venue_id: venueId,
    user_id: userId,
    message,
    category,
    rating,
    status: 'pending'
  }]);

  if (error) throw error;
}

export async function getFeedback(venueId: string) {
  const { data, error } = await supabase
    .from('artist_feedback')
    .select('*, profiles(name)')
    .eq('venue_id', venueId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Feedback[];
}