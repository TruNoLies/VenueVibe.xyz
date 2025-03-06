import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { ConversationList } from '../components/messages/ConversationList';
import { MessageList } from '../components/messages/MessageList';
import { MessageInput } from '../components/messages/MessageInput';
import { Card } from '../components/ui/Card';
import { fetchConversations, fetchMessages, sendMessage, markMessageAsRead } from '../lib/api/messages';
import toast from 'react-hot-toast';

export default function Messages() {
  const { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (id) {
      loadMessages(id);
    }
  }, [id]);

  async function loadConversations() {
    try {
      const data = await fetchConversations();
      setConversations(data);
    } catch (error) {
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages(conversationId: string) {
    try {
      setLoading(true);
      const data = await fetchMessages(conversationId);
      setMessages(data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage(content: string) {
    if (!id) return;

    try {
      await sendMessage(id, content);
      await loadMessages(id);
      await loadConversations(); // Refresh conversation list to update last message
    } catch (error) {
      toast.error('Failed to send message');
    }
  }

  async function handleMessageRead(messageId: string) {
    try {
      await markMessageAsRead(messageId);
      await loadConversations(); // Refresh unread status
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Messages"
        description="Chat with artists and venue managers"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-1">
          <ConversationList
            conversations={conversations}
            selectedId={id}
          />
        </div>

        <div className="md:col-span-2">
          {id ? (
            <Card className="flex flex-col h-[600px]">
              {loading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-primary" />
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto">
                    <MessageList
                      messages={messages}
                      onMessageRead={handleMessageRead}
                    />
                  </div>
                  <MessageInput onSend={handleSendMessage} />
                </>
              )}
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-400">
                Select a conversation to start messaging
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}