import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || sending) return;

    try {
      setSending(true);
      await onSend(content.trim());
      setContent('');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-dark-200">
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="input flex-grow min-h-[80px] max-h-[160px] rounded-md resize-y"
          disabled={disabled || sending}
        />
        <Button
          type="submit"
          disabled={disabled || sending || !content.trim()}
          className="self-end"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}