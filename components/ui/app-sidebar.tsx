'use client'
import { ArrowLeft, Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import chatImage from "@/public/chat/chat.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDeleteChatMutation, useFetchAllChatQuery, useRenameChatMutation } from "@/redux/feature/chat/aiChat";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from '@/hooks/use-toast';

type ChatData = {
  uuid: string;
  chat_title: string;
  created_at: string;
  updated_at: string | null;
};

type AppSidebarProps = {
  selectedChatId: string | null | string[];
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null | string[]>>;
};


export function AppSidebar({ selectedChatId, setSelectedChatId }: AppSidebarProps) {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  // const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data: apiData, isLoading, isError } = useFetchAllChatQuery();
  const [renameChat] = useRenameChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track which chat is being edited
  const [newTitle, setNewTitle] = useState<string>('');
  

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (apiData?.payload) {
      setChatData(apiData.payload);
    }
  }, [apiData]);

  const handleBackClick = () => {
    const uuid = localStorage.getItem('resultUuid')
    const type = localStorage.getItem('currentType')

    const newPath = `/${currentLocale}/test-result/${type}/${uuid}`;

    if (uuid && type) {
      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${currentLocale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }
    }else{
      router.push(`/${currentLocale}`)
    }
    
  };


  const createNewChat = async () => {
    const newPath = `/${currentLocale}/chat-with-ai/`;

    // Ensure the new path does not contain the duplicate locale part
    if (!pathname.startsWith(`/${currentLocale}`)) {
      // If the pathname doesn't include the current locale, add it
      router.push(newPath);
    } else {
      // If the pathname already includes the locale, navigate to the result directly
      router.push(newPath);
    }
  };

  const chatDetailNavigate = (uuid: string) => {
    setSelectedChatId(uuid);
    const newPath = `/${currentLocale}/chat-with-ai/${uuid}`;

    // Ensure the new path does not contain the duplicate locale part
    if (!pathname.startsWith(`/${currentLocale}`)) {
      // If the pathname doesn't include the current locale, add it
      router.push(newPath);
    } else {
      // If the pathname already includes the locale, navigate to the result directly
      router.push(newPath);
    }

  };


  const handleSaveTitle = (uuid: string) => {
    if (newTitle.trim() !== '') {
      handleRenameChat(uuid, newTitle); // Update the title in the parent component or API
    }
    setIsEditing(null); // Exit edit mode
  };


  const handleRenameClick = (uuid: string, currentTitle: string) => {
    setIsEditing(uuid); // Set the chat being edited
    setNewTitle(currentTitle); // Set the current title as the default value in input
  };


  const handleRenameChat = async (uuid: string, newTitle: string) => {
    try {
      // Trigger the rename mutation
      await renameChat({ uuid, new_title: newTitle }).unwrap();
      console.log("Chat title updated successfully");

      // Optionally, update the local state if you need to update UI immediately
      setIsEditing(null); // Exit edit mode
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  }

  const handleDeleteChat = async (uuid: string) => {
    try {
      // Trigger the rename mutation
      await deleteChat({ uuid }).unwrap();
      toast({
        title: "Chat has been deleted successfully!",
        description: "You can start new chat here.",
        variant: "success",
        duration: 3000,
      })
      const newPath = `/${currentLocale}/chat-with-ai`;

      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${currentLocale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }
      console.log("Chat title have been deleted successfully");

    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  }

  if (isError) return <p className="text-danger p-4">Error loading chats. Please try again later.</p>;

  const sortedChatData = [...chatData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  console.log("chat id: ", selectedChatId)
  return (
    <Sidebar className="bg-white ">
      <SidebarContent className="bg-white ">
        <SidebarGroup>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="flex mb-2 justify-between ">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-primary bg-opacity-10 border-none hover:bg-opacity-20 hover:bg-primary rounded-full shadow-none"
                  onClick={handleBackClick}
                >
                  <ArrowLeft color="#0BBB8A" />
                </Button>
                <div className="flex gap-1 items-center ">
                  <p className="text-lg font-semibold text-gray-700">Messages</p>
                  <div className="w-6 h-6 flex justify-center items-center rounded-full text-xs font-normal bg-gray-400 bg-opacity-10 text-gray-700">
                    {Object.keys(chatData).length}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-primary bg-opacity-10 border-none hover:bg-opacity-20 rounded-full hover:bg-primary shadow-none p-2"
                  onClick={createNewChat}
                >
                  <Plus color="#0BBB8A" />
                </Button>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarHeader>
          <SidebarGroupContent>
            {isLoading ? (
              <div className="flex justify-center items-center p-4 space-y-4 w-full ">
                <div className="w-full max-w-md space-y-3">
                  {/* Skeleton for the chat list - dynamically rendered skeletons */}
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-2">
                      <div>
                        <Skeleton className="w-12 h-12 rounded-xl bg-gray-200" />
                      </div>
                      {/* Avatar skeleton */}
                      <div className="flex flex-col space-y-2 w-full">
                        <Skeleton className="w-full h-3 bg-gray-200 rounded-xl" /> {/* Title skeleton */}
                        <Skeleton className="w-1/2 h-2 bg-gray-200 rounded-xl" /> {/* Date skeleton */}
                      </div>
                      <div>
                        <Skeleton className="w-8 h-2 bg-gray-200 rounded-xl" /> {/* Date skeleton */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <SidebarMenu>
                {sortedChatData.map((chat) => (
                  <SidebarMenuItem key={chat.uuid}>
                    <button
                      onClick={() => chatDetailNavigate(chat.uuid)}
                      className={`w-full text-left flex justify-between items-center  ${chat?.uuid === selectedChatId ? "bg-primary bg-opacity-10" : ""
                        } hover:bg-primary hover:bg-opacity-10`}
                    >
                      <div className="flex  items-start gap-4 p-4 rounded-lg">
                        <Image
                          src={chatImage}
                          alt="Chat avatar"
                          width={36}
                          height={36}
                          className="rounded-xl"
                        />
                        <div>
                          {/* <p className="text-[14px] text-gray-700 font-semibold overflow-hidden whitespace-nowrap max-w-[120px] text-ellipsis ">
                            {chat.chat_title || "Untitled Chat"}
                          </p> */}

                          {isEditing === chat.uuid ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => handleSaveTitle(chat.uuid)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTitle(chat.uuid);
                              }}
                              className="text-[14px] text-gray-700 font-semibold w-full bg-transparent border-b-2 border-primary outline-none"
                            />
                          ) : (
                            <p className="text-[14px] text-gray-700 font-semibold overflow-hidden whitespace-nowrap max-w-[120px] text-ellipsis ">
                              {chat.chat_title || 'Untitled Chat'}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(chat.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                      </div>
                      <div >
                        <Popover >
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className=" rounded-full hover:bg-primary hover:bg-opacity-20"><Ellipsis /></Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-28 bg-white text-left">
                            <div className="flex items-center gap-2 font-semibold text-gray-700 hover:cursor-pointer" onClick={() => handleRenameClick(chat.uuid, chat.chat_title)}>
                              <Pencil className="w-4 h-4" />
                              <p className="text-[14px]">Rename</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-danger font-semibold hover:cursor-pointer" onClick={() => handleDeleteChat(chat.uuid)}>
                              <Trash className="w-4 h-4" />
                              <p className="text-[14px]">Delete</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                    </button>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
