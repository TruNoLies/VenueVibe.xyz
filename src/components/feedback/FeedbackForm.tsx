import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { feedbackCategories } from '../../lib/types/feedback';

interface FeedbackFormProps {
  venueId: string;
  onSubmitted: () => void;
}

export function FeedbackForm({ venueId, onSubmitted }: FeedbackFormProps) {
  const [category, setCategory] = useState(feedbackCategories[0].id);
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [impact, setImpact] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmitted();
      // Reset form
      setSummary('');
      setDetails('');
      setImpact('');
      setSuggestions('');
      setRating(5);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-neon-primary" />
        <h3 className="text-lg font-semibold">Submit Feedback</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input w-full rounded-md"
            >
              {feedbackCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Urgency
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="input w-full rounded-md"
            >
              <option value="low">Low Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Summary
          </label>
          <Input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief summary of your feedback"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Detailed Description
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="Provide specific details about the issue or suggestion..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Impact
          </label>
          <textarea
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="How does this affect your performance or experience?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Suggestions
          </label>
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="input w-full rounded-md min-h-[100px]"
            placeholder="What solutions or improvements would you suggest?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="p-1 hover:scale-110 transition-transform"
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Card>
  );
}