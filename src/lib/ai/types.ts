export interface AIResponse {
  text: string;
  confidence: number;
}

export interface VoiceRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}