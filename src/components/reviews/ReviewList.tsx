import React from 'react';
import { ReviewCard } from '../features/ReviewCard';

interface Review {
  id: string;
  rating: number;
  complaint_count: number;
  comment: string;
  created_at: string;
  venues: {
    name: string;
    location: string;
  };
  profiles: {
    name: string;
  };
}

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
}

export function ReviewList({ reviews, loading }: ReviewListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          authorName={review.profiles.name}
          venueName={review.venues.name}
          venueLocation={review.venues.location}
          rating={review.rating}
          complaintCount={review.complaint_count}
          comment={review.comment}
          createdAt={review.created_at}
        />
      ))}
    </div>
  );
}