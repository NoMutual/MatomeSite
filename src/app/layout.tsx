import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | タイトルじゃ分からない素人系を、中身で探す`,
    template: `%s | ${siteName}`,
  },
  description:
    "FANZA の素人系作品を女の子のタイプ・シチュエーション・撮影スタイルで絞り込んで探せるデータベース。",
  robots: { index: true, follow: true },
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
