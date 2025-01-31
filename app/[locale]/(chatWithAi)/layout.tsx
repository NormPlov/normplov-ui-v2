'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/app/StoreProvider";


const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});



export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const params = useParams();
  const [selectedChatId, setSelectedChatId] = useState<string[] | string | null>(null);

  useEffect(() => {
    // You can fetch the `uuid` from params and set it as `selectedChatId`
    const uuid = params.id;
    if (uuid) {
      setSelectedChatId(uuid);  // Set the selected chat id when the route changes
    }
  }, [params.id]);  // Ensure selected chat id updates on route changes

  return (
    <html lang="en">
      <body className={`${suwannaphum.className} ${inter} antialiased `}>
        <StoreProvider>
          <SidebarProvider>
            {/* <AppSidebar /> */}
            <AppSidebar selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
            <main className="w-full h-screen overflow-hidden bg-gradient-to-t from-green-50 to-[#F9FAFE]">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </StoreProvider>

      </body>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </html>
  );
}


