//import "@/app/globals.css";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
import FloatingButtons from "@/components/General/FloatingButton";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    template: "%s - NormPlov", // Using the template to append the title dynamically
    default: "NormPlov", // Default title when no page-specific title is set
  },
  description: "NormPlov: Find your perfect major and confidence career.",
  openGraph: {
    title: {
      template: "%s - NormPlov",
      default: "NormPlov",
    },
    description: "NormPlov: Find your perfect major and confidence career.",
    images: ["https://normplov-api.shinoshike.studio/assets/metadata.png"],
    url: "https://normplov.shinoshike.studio",
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

export default async function PublicUserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Dynamically fetch the messages based on the locale
  const messages = await getMessages({ locale });

  if (!messages) {
    return notFound(); // Handle missing locale case
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <body
          className={`${suwannaphum.variable} ${inter.variable}`}
          suppressHydrationWarning
        >
          <NavbarPage />
          <main className="w-full">
            {" "}
            {children} <FloatingButtons />{" "}
          </main>
          <FooterPage />
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
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
