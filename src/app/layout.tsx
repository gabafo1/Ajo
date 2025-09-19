import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Balajo",
  description: "Save Together,Grow Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/" >
      <html lang="en">
        <body
          >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
