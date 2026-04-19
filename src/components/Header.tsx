import Link from "next/link";
import { TAG_CATEGORY_LABEL } from "@/lib/tags";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export function Header() {
  const categories = Object.entries(TAG_CATEGORY_LABEL);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-4 py-3 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-black text-white">
            素
          </span>
          <span className="text-base font-bold tracking-tight md:text-lg">
            {siteName}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-5 text-sm text-muted md:flex">
          <Link href="/works" className="transition hover:text-text">
            作品を探す
          </Link>
          {categories.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/tags/${slug}`}
              className="transition hover:text-text"
            >
              {label}
            </Link>
          ))}
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
