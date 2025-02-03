import type { Metadata } from "next";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

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
export const metadata: Metadata = {
  title: {
    template: "E-Found",
    default: "E-Found",
  },
  description: `E-Found: Find your perfect major and confindence career.`,
  openGraph: {
    title: {
      template: "%s - E-Found",
      default: "E-Found",
    },
    description: `E-Found: Find your perfect major and confindence career.`,
    images: ["https://normplov.istad.co/assets/metadata.png"],
    url: "https://normplov.istad.co",
  },
  icons: {
    icon: "/assets/logo.jpg", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/logo.jpg", // Apple touch icon (iOS)
    shortcut: "/assets/logo.jpg", // Shortcut icon for browsers
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suwannaphum.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        {/* Main content */}
        <main> {children}</main>
        <Toaster />
      </body>
    </html>
  );
}
