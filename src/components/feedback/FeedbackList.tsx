import React from 'react';
import { FeedbackItem } from './FeedbackItem';
import type { Feedback } from '../../lib/types/feedback';

interface FeedbackListProps {
  feedback: Feedback[];
}

export function FeedbackList({ feedback }: FeedbackListProps) {
  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
}