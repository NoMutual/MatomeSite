import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-bold tracking-tight">
          {siteName}
        </Link>
        <nav className="flex gap-4 text-sm text-muted">
          <Link href="/works" className="hover:text-text">
            作品を探す
          </Link>
          <Link href="/tags" className="hover:text-text">
            タグ一覧
          </Link>
        </nav>
      </div>
    </header>
  );
}
