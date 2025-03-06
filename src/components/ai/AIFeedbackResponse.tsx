import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { processAIResponse } from '../../lib/ai/processing';
import type { ChatMessage } from '../../lib/ai/types';

interface AIFeedbackResponseProps {
  feedback: string;
  onResponse?: (response: string) => void;
}

export function AIFeedbackResponse({ feedback, onResponse }: AIFeedbackResponseProps) {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feedback) {
      handleProcessFeedback();
    }
  }, [feedback]);

  const handleProcessFeedback = async () => {
    setLoading(true);
    try {
      const aiResponse = await processAIResponse(feedback);
      setResponse(aiResponse.text);
      onResponse?.(aiResponse.text);
    } catch (error) {
      console.error('AI processing error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!feedback) return null;

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-neon-primary" />
        <span className="font-medium">AI Response</span>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neon-primary" />
        </div>
      ) : (
        <p className="text-gray-300">{response}</p>
      )}
    </Card>
  );
}