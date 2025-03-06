import React from 'react';
import { FeedbackForm } from './FeedbackForm';
import { FeedbackList } from './FeedbackList';
import { Card } from '../ui/Card';
import type { Feedback } from '../../lib/types/feedback';

interface FeedbackSectionProps {
  feedback: Feedback[];
  venueId: string;
  onFeedbackSubmitted: () => void;
  showForm?: boolean;
}

export function FeedbackSection({
  feedback,
  venueId,
  onFeedbackSubmitted,
  showForm = true
}: FeedbackSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-100">
        Artist Feedback ({feedback.length})
      </h2>

      {showForm && (
        <FeedbackForm 
          venueId={venueId} 
          onSubmitted={onFeedbackSubmitted} 
        />
      )}
      
      {feedback.length > 0 ? (
        <FeedbackList feedback={feedback} />
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-400">No feedback yet</p>
        </Card>
      )}
    </div>
  );
}