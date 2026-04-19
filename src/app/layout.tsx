import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { AgeGate } from "@/components/AgeGate";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | 中身が分かる素人系作品検索`,
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
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted">
          <p>
            当サイトは FANZA のアフィリエイトプログラムに参加しています。掲載商品のリンクは広告です。
          </p>
          <p className="mt-1">18歳未満の閲覧は固くお断りします。</p>
        </footer>
      </body>
    </html>
  );
}
