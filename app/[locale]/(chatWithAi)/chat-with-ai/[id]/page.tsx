'use client';

import { useState, useEffect } from 'react';
import { DynamicChatComponent } from '@/components/ui/chat/DynamicChatComponent';
import { useParams } from 'next/navigation';
import { useContinueConversationMutation, useFetchConversationDetailsQuery } from '@/redux/feature/chat/aiChat';
import { useGetUserQuery } from '@/redux/service/user';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Send } from 'lucide-react';

type Message = {
  id: string;
  variant: 'received' | 'sent';
  avatar: string | null;
  message: string;
};

export default function ChatApp() {
  const params = useParams();
  const uuid = Array.isArray(params.id) ? params.id[0] : params.id;
  const [, setCurrentLocale] = useState<string>('km');
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  const { data: chatDetail } = useFetchConversationDetailsQuery(uuid || '', {
    skip: !uuid,
  });
  const [continueConversation, { isLoading }] = useContinueConversationMutation();

  useEffect(() => {
    setIsGenerating(isLoading);
  }, [isLoading]);

  const [chatData, setChatData] = useState<{ [key: string]: Message[] }>({});
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: user } = useGetUserQuery();
  console.log("user data", user)
  const userData = user?.payload
  const avatarUrl = userData?.avatar
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
    : '/chat/ai.png';

  console.log("avatar", avatarUrl)
  useEffect(() => {
    if (chatDetail?.payload) {
      const filteredMessages = chatDetail.payload.conversation_history
        .flatMap((entry, index) => [
          {
            id: `${index * 2}`,
            variant: 'sent' as const,
            avatar: avatarUrl,
            message: entry.user_query || '',
          },
          {
            id: `${index * 2 + 1}`,
            variant: 'received' as const,
            avatar: '/chat/ai.png',
            message: entry.ai_reply || '',
          },
        ])
        .filter((message) => !(message.variant === 'sent' && message.message.trim() === '')); // Exclude empty "sent" messages

      setChatData({ [uuid]: filteredMessages });
      setSelectedChatId(uuid);
    }
  }, [chatDetail, uuid, avatarUrl]);


  const updateMessages = (chatId: string, newMessage: Message) => {
    setChatData((prevData) => ({
      ...prevData,
      [chatId]: [...(prevData[chatId] || []), newMessage],
    }));
  };

  const handleSendMessage = async (newQuery: string) => {
    try {
      await continueConversation({ uuid, new_query: newQuery }).unwrap();

    } catch (error) {
      console.error('Error continuing conversation:', error);
    }
  };




  return (
    <div >
      {/* Sidebar */}
      {/* <AppSidebar /> */}

      {/* Chat Content */}
      <div >

        {selectedChatId ? (
          <DynamicChatComponent
            messages={chatData[selectedChatId] || []}
            updateMessages={(newMessage) => {
              updateMessages(selectedChatId, newMessage);

              // Send the new message to the server
              if (newMessage.variant === 'sent') {
                handleSendMessage(newMessage.message);
              }
            }}
            isLoading={isGenerating}
          />
        ) : (


          <div className="flex flex-col h-screen">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">

            </div>

            {/* Input Form */}
            <form
              className="w-full p-4 flex items-center sticky bottom-0"

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


        )}
      </div>



    </div >

  );
}
