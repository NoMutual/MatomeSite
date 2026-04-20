import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人の極み";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | 素人をただ極めて行け。`,
    template: `%s | ${siteName}`,
  },
  description: "素人をただ極めて行け。",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg text-text">
        <AgeGate />
        <Header />
        <main className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 md:py-8 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
