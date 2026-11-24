import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRANDING } from "@/lib/branding";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRANDING.organisationName} (${BRANDING.organisationShort})`,
    template: `%s | ${BRANDING.organisationShort}`,
  },
  description: `${BRANDING.programmeTitle} - Official Interactive Learning Platform for ${BRANDING.organisationName} (${BRANDING.organisationShort})`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F8FA] text-[#172033]">
        {children}
      </body>
    </html>
  );
}
