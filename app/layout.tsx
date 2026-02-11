import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "homan — personal token",
  description:
    "a personal token representing the value its owner will create over the course of their life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${GeistMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
