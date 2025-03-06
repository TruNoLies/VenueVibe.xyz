import React from 'react';
import { ReviewForm } from '../features/ReviewForm';
import { ReviewCard } from '../features/ReviewCard';
import { Card } from '../ui/Card';

interface Review {
  id: string;
  rating: number;
  complaint_count: number;
  comment: string;
  created_at: string;
  profiles: {
    name: string;
  };
}

interface ReviewSectionProps {
  reviews: Review[];
  venueId: string;
  onReviewSubmitted: (review: any) => Promise<void>;
  showForm?: boolean;
}

export function ReviewSection({ 
  reviews, 
  venueId, 
  onReviewSubmitted,
  showForm = true
}: ReviewSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-100">
        Reviews ({reviews.length})
      </h2>

      {showForm && (
        <ReviewForm onSubmit={onReviewSubmitted} />
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              authorName={review.profiles.name}
              rating={review.rating}
              complaintCount={review.complaint_count}
              comment={review.comment}
              createdAt={review.created_at}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-400">No reviews yet</p>
        </Card>
      )}
    </div>
  );
}