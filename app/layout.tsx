import "./globalsGoogle.css";
// import SessionWrapper from "./SessionProvider";
import StoreProvider from "./StoreProvider";
import { Inter, Suwannaphum } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";  // Optional for error handling
import { getMessages } from "next-intl/server";
//import InitialLoader from "@/components/ui/FirstTimeLoader";


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


export default async function RootLayout({
  children,
  params, // This will provide the `locale`
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }; // Dynamic locale
}>) {
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
            {/* <SessionWrapper> */}
           

              <StoreProvider>{children}</StoreProvider>

            {/* </SessionWrapper> */}
          </body>
        </html>
      </NextIntlClientProvider>
    );
  } 
  