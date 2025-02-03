//import "@/app/globals.css";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
import "react-toastify/dist/ReactToastify.css";
import FloatingButtons from "@/components/General/FloatingButton";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation"; // Optional for error handling
import { Toaster } from "@/components/ui/toaster";
// import { toast } from "sonner"



export const metadata: Metadata = {
  title: {
    template: "%s - E-Found", // Using the template to append the title dynamically
    default: "E-Found", // Default title when no page-specific title is set
  },
  description: "E-Found: Find your perfect major and confidence career.",
  openGraph: {
    title: {
      template: "%s - E-Found",
      default: "E-Found",
    },
    description: "E-Found: Find your perfect major and confidence career.",
    images: ["https://normplov.istad.co/assets/metadata.png"],
    url: "https://normplov.istad.co/km",
  },
  icons: {
    icon: "/assets/logo.jpg", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/logo.jpg", // Apple touch icon (iOS)
    shortcut: "/assets/logo.jpg", // Shortcut icon for browsers
  },
};


const suwannaphum = Suwannaphum({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-suwannaphum",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }; // Dynamic locale
}) {

  const { locale } = params;
  //const [loading, setLoading] = useState(true);

  // Dynamically fetch the messages based on the locale
  const messages = await getMessages({ locale });

  

  if (!messages) {
    return notFound(); // Handle missing locale case
  }
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>

        <html lang={locale}>
          <body
            className={`${suwannaphum.variable} ${inter.variable}`}
            suppressHydrationWarning
          >
            <NavbarPage />
            <main className="w-full">
              {children}
              <FloatingButtons />
            </main>
            <Toaster />
            <FooterPage />
            {/* <ToastContainer
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
            /> */}
          </body>
        </html>

      </NextIntlClientProvider>
    );
  } 