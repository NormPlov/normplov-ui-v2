import "@/app/globals.css";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import SideBarProfileComponent from "@/components/ProfileComponent/SideBarProfileComponent";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});



export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-bgPrimaryLight ${suwannaphum.className} ${inter} antialiased `}
      >
        <NavbarPage/>
       
        <div className=" lg:flex p-6 gap-6">
          {/* Sidebar */}
          <SideBarProfileComponent />
           
          {/* Main Content */}
          <main className=" w-full h-auto">{children}</main>
        </div>
        <FooterPage/>
      </body>
    </html>
  );
}
