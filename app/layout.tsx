import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TaskFlow",
    default: "TaskFlow",
  },
  description: "An app for managing group tasks",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${space.className} h-full antialiased`}>
      <body className="h-screen flex flex-col bg-[#edf1f5]">{children}</body>
    </html>
  );
}
