import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface ArtistFeedbackProps {
  venueId: string;
  onFeedbackSubmitted: () => void;
}

export function ArtistFeedback({ venueId, onFeedbackSubmitted }: ArtistFeedbackProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('artist_feedback').insert([
        {
          venue_id: venueId,
          user_id: user.id,
          message,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      toast.success('Feedback submitted successfully');
      setMessage('');
      onFeedbackSubmitted();
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-neon-primary" />
        <h3 className="text-lg font-semibold">Artist Feedback</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your experience or concerns..."
          className="input w-full min-h-[100px] rounded-md"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Card>
  );
}