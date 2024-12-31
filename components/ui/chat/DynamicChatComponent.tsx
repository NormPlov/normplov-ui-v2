'use client';

import { useState } from 'react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  variant: 'received' | 'sent'; // Specifies if the message was sent or received
  avatar: string | null; // The avatar URL or null for no avatar
  message: string; // The text of the message
};

type DynamicChatPageProps = {
  messages: Message[]; // Array of messages for the selected chat
  updateMessages: (newMessage: Message) => void; // Function to add a new message
};

export const DynamicChatComponent = ({ messages, updateMessages }: DynamicChatPageProps) => {
  const [userInput, setUserInput] = useState('');

  // Handle form submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      variant: 'sent',
      avatar: null, // No avatar for the user
      message: userInput,
    };

    updateMessages(userMessage); // Add the user's message

    setUserInput('');
  }


  return (
  

    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessageList>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} variant={msg.variant}>
              <ChatBubbleAvatar fallback="AI" src={msg.avatar ?? undefined} />
              <ChatBubbleMessage><ReactMarkdown>{msg.message}</ReactMarkdown></ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>

      {/* Input Form */}
      <form
        className="w-full bg-white p-4 flex items-center sticky bottom-0"
        onSubmit={handleSendMessage}
      >
        <div className="flex items-center w-full bg-white rounded-full p-2 shadow-sm border">
          <ChatInput
            placeholder="Type your message here..."
            className="min-h-12 resize-none bg-transparent border-0 p-3 shadow-none flex-grow outline-none rounded-full"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-primary text-white rounded-full flex items-center justify-center ml-2 hover:bg-primary-dark transition"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
