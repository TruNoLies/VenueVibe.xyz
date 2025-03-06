import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  votes: number;
  created_at: string;
  profiles: {
    name: string;
  };
}

export function SuggestionList() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  async function fetchSuggestions() {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*, profiles(name)')
        .order('votes', { ascending: false });

      if (error) throw error;
      setSuggestions(data);
    } catch (error) {
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(id: string) {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_feedback_votes', {
        feedback_id: id
      });

      if (error) throw error;
      await fetchSuggestions();
    } catch (error) {
      toast.error('Failed to vote');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Community Suggestions</h2>
      
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-100 mb-2">
                {suggestion.title}
              </h3>
              <p className="text-gray-400 mb-4">{suggestion.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>By {suggestion.profiles.name}</span>
                <span className="capitalize">{suggestion.type}</span>
                <span className="capitalize bg-dark-200 px-2 py-1 rounded">
                  {suggestion.status}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => handleVote(suggestion.id)}
              className="flex items-center gap-2 text-neon-primary hover:text-neon-secondary transition-colors"
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{suggestion.votes}</span>
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}