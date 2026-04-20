import Link from "next/link";

export const metadata = {
  title: "ガイド",
  description: "素人系作品の選び方・楽しみ方のガイド記事。",
};

const articles = [
  {
    slug: "how-to-choose-amateur",
    title: "素人系の選び方完全ガイド｜タイトルから失敗しない3つの基準",
    description:
      "「〇〇ちゃん」タイトルで中身が想像できない素人系を、失敗せずに選ぶ方法を解説。",
    date: "2026-04-19",
    readTime: "8分",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <h1 className="text-3xl font-black md:text-4xl">ガイド</h1>
        <p className="mt-2 text-sm text-muted">
          素人系作品の選び方・楽しみ方を深掘り
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/guides/${a.slug}`}
            className="card-hover group block rounded-xl border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{a.date}</span>
              <span>·</span>
              <span>{a.readTime}</span>
            </div>
            <h2 className="mt-2 text-lg font-bold leading-snug group-hover:text-primary">
              {a.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted">
              {a.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
