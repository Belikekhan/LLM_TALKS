import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "LLM Talks — Watch AI Minds Converse",
  description:
    "A spectator experience where two AI models have a conversation around a pixel-art campfire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} antialiased`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
        {children}
      </body>
    </html>
  );
}
