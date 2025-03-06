import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { VoiceRecognition } from '../../lib/ai/voiceRecognition';
import { processAIResponse } from '../../lib/ai/processing';
import toast from 'react-hot-toast';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition] = useState(() => new VoiceRecognition());

  const handleVoiceResult = async (transcript: string) => {
    try {
      // Process voice input through AI
      const aiResponse = await processAIResponse(transcript);
      onResult(aiResponse.text);
    } catch (error) {
      toast.error('Error processing voice input');
      onResult(transcript); // Fallback to raw transcript
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start(
        handleVoiceResult,
        (error) => {
          toast.error('Voice recognition error: ' + error.message);
          setIsListening(false);
        }
      );
      setIsListening(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleListening}
      className={isListening ? 'text-neon-primary' : ''}
    >
      {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
    </Button>
  );
}