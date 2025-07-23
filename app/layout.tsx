import type React from "react";
import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google"; 
import "./globals.css";
import { Inter } from 'next/font/google'
import ColorProvider from '@/components/ColorProvider';
import { Toaster } from 'react-hot-toast'
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
// Import Raleway for general text
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-raleway',
});

// Import Montserrat for numbers and small letters
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "CLCK",
  description: "Professional bookkeeping and financial services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/Images/logo.png" />
      </head>
      <body className={`${raleway.variable} ${inter.variable} ${montserrat.variable}`}>
        <ColorProvider>
          <main>{children}</main>
        </ColorProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}