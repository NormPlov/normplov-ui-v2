//import "@/app/globals.css";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import SideBarProfileComponent from "@/components/ProfileComponent/SideBarProfileComponent";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
import { Toaster } from "@/components/ui/toaster";
export const suwannaphum = Suwannaphum({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-suwannaphum",
});

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` ${suwannaphum.variable} ${inter.variable} ` }
        suppressHydrationWarning
        
      >
        <NavbarPage/>
       
       <section className=" bg-[#F7FDFB]">
       <section className="lg:mx-20">
       <div className=" lg:flex p-6  gap6">
          {/* Sidebar */}
          <SideBarProfileComponent />
           
          {/* Main Content */}
          <main className="lg:pl-10 w-full h-auto">{children}</main>
          <Toaster />
        </div>
       </section>
       </section>
        <FooterPage/>
      </body>
    </html>
  );
}