import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ReviewList } from '../components/reviews/ReviewList';
import { ReviewForm } from '../components/features/ReviewForm';
import { ReviewFilters } from '../components/reviews/ReviewFilters';
import { fetchReviews } from '../lib/reviews';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rating: 0,
    sortBy: 'latest'
  });

  useEffect(() => {
    loadReviews();
  }, [filters]);

  async function loadReviews() {
    try {
      setLoading(true);
      const data = await fetchReviews(filters);
      setReviews(data);
    } catch (error) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }

  async function handleReviewSubmit(review) {
    try {
      await submitReview({
        ...review,
        userId: user.id
      });
      toast.success('Review submitted successfully');
      loadReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Artist Reviews"
        description="Discover authentic venue experiences shared by artists"
        backTo="/"
        backLabel="Back to Home"
      />

      {user && (
        <ReviewForm onSubmit={handleReviewSubmit} />
      )}

      <ReviewFilters
        filters={filters}
        onChange={setFilters}
      />

      <ReviewList
        reviews={reviews}
        loading={loading}
      />
    </div>
  );
}