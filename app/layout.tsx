import type React from "react";
import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google"; 
import "./globals.css";

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
      <body className={`${raleway.variable} ${montserrat.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}