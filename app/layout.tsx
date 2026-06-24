import type { Metadata } from "next";
import { Providers } from './providers';
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

import { Pirata_One } from "next/font/google";

const pirata = Pirata_One({
  subsets: ['latin'],
  variable: '--font-pirata',
  weight: '400',
  display: 'swap'
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SentinelGear - Airsoft & Equipment",
  description: "SentinelGear",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(pirata.variable, oswald.variable, inter.variable)}>
      <body className="min-h-screen flex flex-col bg-[#000000] overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}



