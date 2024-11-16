import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

import { Space_Grotesk } from 'next/font/google';

// Load the font with specific weights and subsets
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], 
  weight: ['500'], 
});


export const metadata: Metadata = {
  title: "BrightNext Auth",
  description: "Nextjs Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/authentication-favicon.ico" />
      </head>
      <body className={spaceGrotesk.className}>
        <ToastContainer />
        
        {children}
      </body>
    </html>
  );
}
