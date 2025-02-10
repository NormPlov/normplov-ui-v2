'use client';

import { useCallback, useMemo, useState } from 'react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Send } from 'lucide-react';
import { useGetUserQuery } from '@/redux/service/user';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from './code-display-block';
import { Button } from '../button';


type Message = {
  id: string;
  variant: 'received' | 'sent'; // Specifies if the message was sent or received
  avatar: string | null; // The avatar URL or null for no avatar
  message: string; // The text of the message
};

type DynamicChatPageProps = {
  messages: Message[]; // Array of messages for the selected chat
  updateMessages: (newMessage: Message) => void; // Function to add a new message
  isLoading: boolean
};

export const DynamicChatComponent = ({ messages, updateMessages, isLoading }: DynamicChatPageProps) => {

  const [userInput, setUserInput] = useState('');
  const { data: user } = useGetUserQuery();

  const userData = user?.payload
  const avatarUrl = userData?.avatar
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
    : null;


  // Handle form submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      variant: 'sent',
      avatar: avatarUrl, // No avatar for the user
      message: userInput,
    };

    updateMessages(userMessage); // Add the user's message

    setUserInput('');
  }

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault(); // Prevent default form refresh
    if (!userInput.trim()) return; // Prevent empty messages
    handleSendMessage(e)
    console.log("Sending message:", userInput);
    setUserInput(""); // Clear input after sending
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  }, []);

  const memoizedMessages = useMemo(() => {
    return messages.map((msg) => (
      <ChatBubble key={msg.id} variant={msg.variant}>
        <ChatBubbleAvatar fallback="AI" src={msg.avatar ?? undefined} />
        <ChatBubbleMessage>
          {msg.message.split("```").map((part, index) =>
            index % 2 === 0 ? (
              <Markdown key={index} remarkPlugins={[remarkGfm]}>
                {part}
              </Markdown>

            ) : (
              <pre className="pt-2" key={index}>
                <CodeDisplayBlock code={part} lang="" />
              </pre>
            )
          )}
        </ChatBubbleMessage>
      </ChatBubble>
    ));
  }, [messages]);




  return (


    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessageList>

          {memoizedMessages}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="/chat/ai.png" fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* Input Form */}
      <form
        className="w-full p-4 flex items-center sticky bottom-0"
        onSubmit={handleSendMessage}
      >
        <div className="flex items-center w-full bg-white rounded-full p-2 shadow-sm border">
          <ChatInput
            placeholder="Type your message here..."
            className="min-h-12 resize-none bg-transparent border-0 p-3 shadow-none flex-grow outline-none rounded-full"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevents new line in multiline inputs
                handleSubmit(e); // Calls the submit function
              }
            }}
          />
          <Button
            type="submit"
            className="p-3 bg-primary text-white rounded-full flex items-center justify-center ml-2 hover:bg-primary-dark transition"
            disabled={isLoading || !userInput}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}
