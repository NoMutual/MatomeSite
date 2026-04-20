import Image from "next/image";
import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人の極み";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-4 py-3 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label={siteName}
        >
          <Image
            src="/logo.png"
            alt={siteName}
            width={600}
            height={315}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-5 text-sm text-muted md:flex">
          <Link href="/works" className="transition hover:text-text">
            作品を探す
          </Link>
          <Link href="/tags" className="transition hover:text-text">
            タグ一覧
          </Link>
          <Link href="/guides" className="transition hover:text-text">
            ガイド
          </Link>
        </nav>

        <form action="/works" method="get" className="ml-auto hidden md:block">
          <input
            name="keyword"
            placeholder="作品を検索..."
            className="h-9 w-56 rounded-lg border border-border bg-surface px-3 text-sm placeholder:text-muted/70 focus:border-primary focus:outline-none"
          />
        </form>

        <Link
          href="/works"
          className="ml-auto rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white md:hidden"
        >
          探す
        </Link>
      </div>
    </header>
  );
}
