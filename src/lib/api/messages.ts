import { supabase } from '../supabase';
import type { Message, Conversation } from '../types/messages';

export async function fetchConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      participants:conversation_participants(
        user_id,
        last_read_at,
        profiles(name)
      ),
      last_message:messages(
        id,
        content,
        created_at,
        read_at,
        sender:profiles(name)
      )
    `)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as Conversation[];
}

export async function fetchMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      profiles(name)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Message[];
}

export async function sendMessage(conversationId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('messages')
    .insert([{
      conversation_id: conversationId,
      sender_id: user.id,
      content
    }]);

  if (error) throw error;
}

export async function markMessageAsRead(messageId: string) {
  const { error } = await supabase
    .rpc('mark_message_read', { message_id: messageId });

  if (error) throw error;
}

export async function createConversation(participantIds: string[]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Start transaction
  const { data: conversation, error: conversationError } = await supabase
    .from('conversations')
    .insert({})
    .select()
    .single();

  if (conversationError) throw conversationError;

  // Add participants
  const participants = [...new Set([...participantIds, user.id])];
  const { error: participantsError } = await supabase
    .from('conversation_participants')
    .insert(
      participants.map(userId => ({
        conversation_id: conversation.id,
        user_id: userId
      }))
    );

  if (participantsError) throw participantsError;

  return conversation;
}