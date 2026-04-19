import Link from "next/link";
import { TAG_CATEGORY_LABEL } from "@/lib/tags";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

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
              タイトルから中身が分かりにくい素人系作品を、
              独自タグで絞り込んで探せるデータベース。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            {categories.map(([slug, label]) => (
              <div key={slug}>
                <Link
                  href={`/tags/${slug}`}
                  className="font-medium text-text hover:text-primary"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-1 border-t border-border pt-6 text-[11px] leading-relaxed text-muted">
          <p>
            当サイトは FANZA のアフィリエイトプログラムに参加しています。
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
