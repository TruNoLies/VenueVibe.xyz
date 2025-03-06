import React, { useEffect, useRef } from 'react';
import { formatDate } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import type { Message } from '../../lib/types/messages';

interface MessageListProps {
  messages: Message[];
  onMessageRead?: (messageId: string) => void;
}

export function MessageList({ messages, onMessageRead }: MessageListProps) {
  const { user } = useAuth();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Mark unread messages as read
    messages.forEach(message => {
      if (message.sender_id !== user?.id && !message.read_at) {
        onMessageRead?.(message.id);
      }
    });
  }, [messages, user?.id]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === user?.id;

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isOwnMessage
                  ? 'bg-neon-primary text-white'
                  : 'bg-dark-200 text-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">
                  {message.profiles.name}
                </span>
                <span className="text-xs opacity-75">
                  {formatDate(message.created_at)}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}