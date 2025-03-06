import { AIResponse } from './types';
import { AI_CONFIG } from './config';

export async function processAIResponse(input: string): Promise<AIResponse> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{ role: 'user', content: input }],
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens
      })
    });

    const data = await response.json();
    return {
      text: data.choices[0].message.content,
      confidence: 0.95
    };
  } catch (error) {
    console.error('AI processing error:', error);
    return {
      text: "I'm sorry, I couldn't process that request. Please try again.",
      confidence: 0
    };
  }
}