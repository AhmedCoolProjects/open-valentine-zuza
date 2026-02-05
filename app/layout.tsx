import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💕 Will You Be My Valentine? 💕",
  description: "A special Valentine's Day message made with love for Zuza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-quicksand">
        {children}
      </body>
    </html>
  );
}
