import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"



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
  title: "BookMeetsAI",
  description: "If Books Could Talk, We Listen. Your AI-Powered Book Companion.",
  icons:{
    icon:'/icon.png'
  }
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
        
         
           
            <ClerkProvider>

           <Navbar/>
           <main className="pt-14">

          {children}
           </main>
           <Toaster/>
            </ClerkProvider>
          
       
      </body>
    </html>
  );
}
