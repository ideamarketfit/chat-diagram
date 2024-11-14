import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

// Import the translations
import common from '@/public/locales/en/common.json';
import { EmbeddedFeedbackButton } from "@/components/makeform/emb-feedback-button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: common.metaTitle,
  description: common.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="chatdiagram.com"
          src="https://plausible.io/js/script.file-downloads.outbound-links.js"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="fixed bottom-0 right-0">
          <EmbeddedFeedbackButton />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
