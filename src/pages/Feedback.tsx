import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { FeedbackForm } from '../components/feedback/FeedbackForm';
import { FeedbackList } from '../components/feedback/FeedbackList';
import { useAuth } from '../contexts/AuthContext';
import { submitFeedback } from '../lib/api/feedback';
import toast from 'react-hot-toast';

export default function Feedback() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleFeedbackSubmit(feedbackData) {
    if (!user) {
      toast.error('Please sign in to submit feedback');
      return;
    }

    try {
      setLoading(true);
      await submitFeedback({
        ...feedbackData,
        userId: user.id
      });
      toast.success('Feedback submitted successfully');
      // Refresh feedback list
      // Add your fetch feedback logic here
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Venue Feedback"
        description="Share your suggestions and help improve venues"
        backTo="/"
        backLabel="Back to Home"
      />

      {user && (
        <FeedbackForm
          venueId="general" // Update this based on your needs
          onSubmitted={handleFeedbackSubmit}
        />
      )}

      <FeedbackList feedback={feedback} />
    </div>
  );
}