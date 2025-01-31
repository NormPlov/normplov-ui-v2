"use client"
import Image from 'next/image';
import aichat from '@/public/chat/aiChat.png'
import { useCreateChatMutation } from '@/redux/feature/chat/aiChat';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Lightbulb, Send, TrendingUp } from 'lucide-react';
import { useGetUserQuery } from '@/redux/service/user';
import logo from '@/public/assets/logo.jpg'

type Message = {
  id: string;
  variant: 'received' | 'sent'; // Specifies if the message was sent or received
  avatar: string | null; // The avatar URL or null for no avatar
  message: string; // The text of the message
};


export default function Page() {

  const router = useRouter();
  const pathname = usePathname();
  const [createChat] = useCreateChatMutation();
  const [currentLocale, setCurrentLocale] = useState<string>('km');

  const [userInput, setUserInput] = useState('');
  const { data: user } = useGetUserQuery();

  const username = user?.payload?.username
  console.log("user data", username)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  const createNewChat = async () => {
    try {
      const response = await createChat({ user_query: null }).unwrap();

      const newChat = {
        uuid: response.payload.conversation_uuid,
        chat_title: response.payload.chat_title,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      // Navigate to the new chat's details page
      const newPath = `/${currentLocale}/chat-with-ai/${newChat.uuid}`;

      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${currentLocale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }
      // router.push(`/chat-with-ai/${newChat.uuid}`);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setUserInput('');
  }

  return (
    <div className='w-full h-screen  '>
      {/* Chat Sidebar */}
      {/* <AppSidebar /> */}

      <div className='flex flex-col justify-center items-center h-screen space-y-1 lg:space-y-2'>

        {/* <Image src={logo} alt='logo' className='max-w-[80px]' /> */}


        <p className='text-center text-xl md:text-2xl lg:text-3xl font-semibold '>What can I recommend for you?</p>
        <p className='text-center text-sm text-slate-500 mt-2 '>You can ask anything related to your result. <b >eg. What career suits my skills?</b> </p>
        <form
          className="max-w-[600px] p-4 w-full mx-auto"
          onSubmit={handleSendMessage}
        >
          <div className="flex items-center w-full bg-white rounded-full p-2 border">
            <ChatInput
              placeholder="Ask for your recommendation..."
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

        <div className='rounded-full max-w-[540px] w-full -pt-2'>


        </div>
      </div>




      {/* <div className="h-screen flex justify-center items-center overflow-hidden p-4">
          <div className='flex justify-center flex-col items-center'>
            <Image
              src={aichat}
              alt="Quiz Illustration"
              width={500}
              height={500}
              className="object-fill w-[250px] h-[250px]"
            />
            <p className='text-center -mt-2 max-w-[400px]'><span onClick={createNewChat} className='text-primary hover:cursor-pointer hover:underline'>No chats yet?</span> Create a new conversation or pick one from the sidebar to get started.</p>
          </div>
        </div> */}
      {/* Input Form */}



    </div >

  );
}
