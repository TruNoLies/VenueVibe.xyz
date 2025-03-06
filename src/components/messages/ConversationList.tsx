import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import type { Conversation } from '../../lib/types/messages';
import { useAuth } from '../../contexts/AuthContext';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
}

export function ConversationList({ conversations, selectedId }: ConversationListProps) {
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherParticipants = conversation.participants
          .filter(p => p.user_id !== user?.id)
          .map(p => p.profiles.name)
          .join(', ');

        const lastMessage = conversation.last_message;
        const isSelected = conversation.id === selectedId;

        return (
          <Link key={conversation.id} to={`/messages/${conversation.id}`}>
            <Card
              className={`p-4 hover:bg-dark-200 transition-colors ${
                isSelected ? 'bg-dark-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-neon-primary" />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-100 truncate">
                      {otherParticipants}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-400">
                        {formatDate(lastMessage.created_at)}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-gray-400 truncate">
                      <span className="font-medium">
                        {lastMessage.sender.name}:
                      </span>{' '}
                      {lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}