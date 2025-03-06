import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { ReviewForm } from '../components/features/ReviewForm';
import { FeedbackForm } from '../components/feedback/FeedbackForm';
import { ReviewList } from '../components/reviews/ReviewList';
import { FeedbackList } from '../components/feedback/FeedbackList';
import { venueDirectory } from '../lib/venues/directory';
import { useAuth } from '../contexts/AuthContext';
import type { VenueDirectory } from '../lib/venues/types';
import toast from 'react-hot-toast';

export default function VenueDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [venue, setVenue] = useState<VenueDirectory | undefined>();
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchVenue = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate async for future API integration
        const foundVenue = venueDirectory.find(v => v.id === id);
        
        if (mounted) {
          setVenue(foundVenue);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load venue details');
          setLoading(false);
        }
      }
    };

    fetchVenue();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleReviewSubmit(review) {
    try {
      // Add your review submission logic here
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  }

  async function handleFeedbackSubmit() {
    try {
      // Add your feedback submission logic here
      toast.success('Feedback submitted successfully');
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-2">Error</h2>
        <p className="text-gray-400">{error}</p>
      </Card>
    );
  }

  if (!venue) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-2">Venue Not Found</h2>
        <p className="text-gray-400">The venue you're looking for doesn't exist or has been removed.</p>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title={venue.name}
        description={`${venue.location.city}, ${venue.location.state}`}
        backTo="/venues"
        backLabel="Back to Venues"
      />
      
      <div className="grid gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              A {venue.category.replace('-', ' ')} venue with a capacity of {venue.capacity} people.
            </p>
            
            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-300">
                {venue.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {user && (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Write a Review</h2>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Submit Feedback</h2>
              <FeedbackForm venueId={venue.id} onSubmitted={handleFeedbackSubmit} />
            </section>
          </>
        )}

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <ReviewList reviews={reviews} loading={false} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Feedback</h2>
          <FeedbackList feedback={feedback} />
        </section>
      </div>
    </div>
  );
}