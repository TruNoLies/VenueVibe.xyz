import React, { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    complaintCount: number;
    comment: string;
    experience: string;
    suggestions: string;
    technicalDetails: string;
    performanceQuality: string;
  }) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [complaintCount, setComplaintCount] = useState(0);
  const [comment, setComment] = useState('');
  const [experience, setExperience] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [performanceQuality, setPerformanceQuality] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        rating,
        complaintCount,
        comment,
        experience,
        suggestions,
        technicalDetails,
        performanceQuality
      });
      // Reset form
      setComment('');
      setExperience('');
      setSuggestions('');
      setTechnicalDetails('');
      setPerformanceQuality('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-1 rounded-full hover:bg-dark-200 transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Issues Encountered
            </label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setComplaintCount(value)}
                  className="p-1 rounded-full hover:bg-dark-200 transition-colors"
                >
                  <Trash2
                    className={`h-6 w-6 ${
                      value <= complaintCount ? 'text-red-400' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Overall Experience
          </label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Share your overall experience performing at this venue..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Technical Details
          </label>
          <textarea
            value={technicalDetails}
            onChange={(e) => setTechnicalDetails(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Describe the sound system, acoustics, stage setup, lighting, etc..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Performance Quality
          </label>
          <textarea
            value={performanceQuality}
            onChange={(e) => setPerformanceQuality(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="How did the venue affect your performance quality? Any notable impacts?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Any other comments or details you'd like to share..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Suggestions for Improvement
          </label>
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="What could the venue improve? Any suggestions for other artists?"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Card>
  );
}