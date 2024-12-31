'use client';

import { useState, useEffect } from 'react';
import { DynamicChatComponent } from '@/components/ui/chat/DynamicChatComponent';
import { AppSidebar } from '@/components/ui/app-sidebar';
import Image from 'next/image';
import aichat from '@/public/chat/emptymailbox.png'
import { useParams } from 'next/navigation';
import { useContinueConversationMutation, useFetchConversationDetailsQuery } from '@/redux/feature/chat/aiChat';
import Loading from '@/components/General/Loading';

type Message = {
  id: string;
  variant: 'received' | 'sent';
  avatar: string | null;
  message: string;
};

export default function ChatApp() {
  const params = useParams();
  const uuid = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: chatDetail, isFetching } = useFetchConversationDetailsQuery(uuid || '', {
    skip: !uuid, 
  });
  const [continueConversation] = useContinueConversationMutation();

  const [chatData, setChatData] = useState<{ [key: string]: Message[] }>({});
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    if (chatDetail?.payload) {
      const filteredMessages = chatDetail.payload.conversation_history
        .flatMap((entry, index) => [
          {
            id: `${index * 2}`,
            variant: 'sent' as const,
            avatar: null,
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
  }, [chatDetail, uuid]);


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

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }


  return (
    <div >
      {/* Sidebar */}
      <AppSidebar/>

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
          />
        ) : (
          <div>
            <div className="h-screen flex justify-center items-center overflow-hidden p-4">
              <div className='flex justify-center flex-col items-center'>
                <Image
                  src={aichat}
                  alt="Quiz Illustration"
                  width={500}
                  height={500}
                  className="object-fill"
                />
                <p className='text-center -mt-4'><span className='text-primary'>No chats yet? </span>Create a new conversation or pick one from the sidebar to get started.</p>

              </div>


            </div>

          </div>

        )}
      </div>



    </div>

  );
}
