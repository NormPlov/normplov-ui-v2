import type { Metadata } from "next";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";

const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
		template: "NormPlov",
		default: "NormPlov",
	},
  description: `NormPlov: Find your perfect major and confindence career.`,
  openGraph: {
		title: {
			template: "%s - NormPlov",
			default: "NormPlov",
		},
		description: `NormPlov: Find your perfect major and confindence career.`,
		images: ["https://normplov-api.shinoshike.studio/assets/metadata.png"],
		url: "https://normplov.shinoshike.studio",
	},
  icons: {
    icon: "/assets/logo.jpg", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/logo.jpg", // Apple touch icon (iOS)
    shortcut: "/assets/logo.jpg", // Shortcut icon for browsers
  },
};


export default function  AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
  <html lang="en">
      <body className={`${suwannaphum.className} ${inter} antialiased`}>
        {/* Main content */}
        <main> {children}</main> 
      </body>
    </html>
  );
}
  