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
  const [ , setCurrentLocale] = useState<string>('km');
  const [userInput, setUserInput] = useState('');

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

  // if (isFetching) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loading />
  //     </div>
  //   );
  // }

  // const resultUuid = localStorage.getItem('resultUuid') || ''

  // const createNewChat = async (message: string) => {
  //   try {
  //     const response = await createChat({ user_query: message, user_test_uuid: resultUuid }).unwrap();

  //     const newChat = {
  //       uuid: response.payload.conversation_uuid,
  //       chat_title: response.payload.chat_title,
  //       created_at: new Date().toISOString(),
  //       updated_at: null,
  //     };

  //     // Navigate to the new chat's details page
  //     const newPath = `/${currentLocale}/chat-with-ai/${newChat.uuid}`;

  //     // Ensure the new path does not contain the duplicate locale part
  //     if (!pathname.startsWith(`/${currentLocale}`)) {
  //       // If the pathname doesn't include the current locale, add it
  //       router.push(newPath);
  //     } else {
  //       // If the pathname already includes the locale, navigate to the result directly
  //       router.push(newPath);
  //     }
  //     // router.push(`/chat-with-ai/${newChat.uuid}`);
  //   } catch (error) {
  //     console.error("Failed to create new chat:", error);
  //   }
  // };


  // const SendCreatedMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!userInput.trim()) return;

  //   console.log("message", userInput)

  //   createNewChat(userInput);

  //   setUserInput('');
  // }


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
            isLoading={isLoading}
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
