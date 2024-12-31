import { AppSidebar } from '@/components/ui/app-sidebar';
import Image from 'next/image';
import aichat from '@/public/chat/emptymailbox.png'


export default function page() {

  return (
    <div >
      {/* Chat Sidebar */}
      <AppSidebar />

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

    </div >

  );
}
