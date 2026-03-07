import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "BookMind",
  description: "If Books Could Talk, We Listen. Your AI-Powered Book Companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
      >
        
          <header className="flex items-center justify-between p-4 border-b">
           
            <ClerkProvider>

           <Navbar/>
          {children}
            </ClerkProvider>
          </header>
       
      </body>
    </html>
  );
}
