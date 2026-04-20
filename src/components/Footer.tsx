import Link from "next/link";
import { TAG_CATEGORY_LABEL } from "@/lib/tags";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人の極み";

export function Footer() {
  const categories = Object.entries(TAG_CATEGORY_LABEL);
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-black text-white">
                素
              </span>
              <span className="font-bold">{siteName}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              素人をただ極めて行け。
              <br />
              タイトルから中身が分かりにくい素人系作品を、独自タグで絞り込んで探せるデータベース。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
                探す
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/works" className="hover:text-primary">
                    作品を探す
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="hover:text-primary">
                    タグ一覧
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-primary">
                    ガイド
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
                カテゴリ
              </div>
              <ul className="space-y-2 text-sm">
                {categories.map(([slug, label]) => (
                  <li key={slug}>
                    <Link href={`/tags/${slug}`} className="hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
                サイト情報
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    サイトについて
                  </Link>
                </li>
                <li>
                  <Link href="/about/privacy" className="hover:text-primary">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/about/disclaimer" className="hover:text-primary">
                    免責事項・広告表記
                  </Link>
                </li>
                <li>
                  <Link href="/about/contact" className="hover:text-primary">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-1 border-t border-border pt-6 text-[11px] leading-relaxed text-muted">
          <p>
            当サイトは DUGA（APEXアフィリエイト）のアフィリエイトプログラムに参加しています。
            掲載商品のリンクは広告です（PR）。
          </p>
          <p>18歳未満の閲覧は固くお断りします。</p>
          <p className="pt-2 text-muted/60">
            © {new Date().getFullYear()} {siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
