import React from 'react';
import { MessageSquare, Clock, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import { Feedback, feedbackCategories } from '../../lib/types/feedback';

interface FeedbackItemProps {
  feedback: Feedback & {
    details?: string;
    impact?: string;
  };
}

export function FeedbackItem({ feedback }: FeedbackItemProps) {
  const category = feedbackCategories.find(c => c.id === feedback.category);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-neon-primary" />
          <span className="font-medium">{feedback.profiles.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{formatDate(feedback.created_at)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm bg-dark-200 px-2 py-1 rounded-full">
            {category?.label}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-1">Summary</h4>
          <p className="text-gray-300">{feedback.message}</p>
        </div>

        {feedback.details && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">Details</h4>
            <p className="text-gray-300">{feedback.details}</p>
          </div>
        )}

        {feedback.impact && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">Impact</h4>
            <p className="text-gray-300">{feedback.impact}</p>
          </div>
        )}
        
        <div className="mt-2">
          <span className={`text-sm px-2 py-1 rounded-full ${
            feedback.status === 'resolved' 
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {feedback.status === 'resolved' ? 'Resolved' : 'Pending'}
          </span>
        </div>
      </div>
    </Card>
  );
}