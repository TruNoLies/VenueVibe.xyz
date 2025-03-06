import React from 'react';
import { Star, Trash2, ThumbsUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDate } from '../../lib/utils';

interface ReviewCardProps {
  authorName: string;
  rating: number;
  complaintCount: number;
  comment: string;
  experience: string;
  suggestions?: string;
  createdAt: string;
  helpful?: number;
  onMarkHelpful?: () => void;
}

export function ReviewCard({
  authorName,
  rating,
  complaintCount,
  comment,
  experience,
  suggestions,
  createdAt,
  helpful = 0,
  onMarkHelpful
}: ReviewCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium text-gray-100">{authorName}</h4>
          <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>

          <div className="flex items-center gap-1.5 text-red-400">
            <Trash2 className="h-5 w-5" />
            <span className="font-medium">{complaintCount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Experience</h5>
          <p className="text-gray-300">{experience}</p>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-300 mb-2">Technical Details</h5>
          <p className="text-gray-300">{comment}</p>
        </div>

        {suggestions && (
          <div>
            <h5 className="text-sm font-medium text-gray-300 mb-2">Suggestions</h5>
            <p className="text-gray-300">{suggestions}</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-dark-200">
          <button
            onClick={onMarkHelpful}
            className="flex items-center gap-2 text-gray-400 hover:text-neon-primary transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{helpful} found helpful</span>
          </button>
        </div>
      </div>
    </Card>
  );
}