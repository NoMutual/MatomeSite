import Link from "next/link";
import { fetchAmateurItems } from "@/lib/dmm";
import { WorkCard } from "@/components/WorkCard";
import { TAG_CATEGORY_LABEL, TAGS } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getTagCounts } from "@/lib/work-tags-store";

export const revalidate = 21600;

export default async function HomePage() {
  let items: Awaited<ReturnType<typeof fetchAmateurItems>>["items"] = [];
  let error: string | null = null;

  try {
    const result = await fetchAmateurItems({ hits: 24, sort: "date" });
    items = result.items;
  } catch (e) {
    error = e instanceof Error ? e.message : "不明なエラー";
  }

  const tagCounts = getTagCounts();
  const categories = Object.entries(TAG_CATEGORY_LABEL) as [TagCategory, string][];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-surface-2 p-6 md:p-10">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            素人系特化・内容で探せるDB
          </div>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            素人を、
            <br className="hidden md:block" />
            <span className="text-primary">ただ極めて行け</span>。
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            タイトルじゃ分からない素人系を、
            女の子のタイプ・シチュエーション・撮影スタイルで絞り込み。
            あなただけの一本を掘り当てる。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/works"
              className="h-11 rounded-lg bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-2 md:h-12 md:text-base"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              作品を探す →
            </Link>
            <Link
              href="/tags"
              className="h-11 rounded-lg border border-border bg-bg/50 px-5 text-sm font-bold backdrop-blur transition hover:border-muted md:h-12 md:text-base"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              タグ一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 新着 */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">
              新着作品
            </h2>
            <p className="mt-1 text-xs text-muted">
              DUGA 素人系カテゴリから最新 24 件
            </p>
          </div>
          <Link
            href="/works"
            className="text-xs font-medium text-primary hover:text-primary-2"
          >
            もっと見る →
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm">
            <p className="font-medium text-text">
              APIから作品を取得できませんでした
            </p>
            <p className="mt-1 text-muted">{error}</p>
            <p className="mt-3 text-xs text-muted">
              APEX（DUGA）アフィリエイト登録後、{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-[11px]">
                .env.local
              </code>{" "}
              に認証情報を設定してください。
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((item) => (
              <WorkCard key={item.content_id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* タグで探す */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold md:text-2xl">タグで探す</h2>
          <p className="mt-1 text-xs text-muted">
            4つの軸で作品を掛け合わせ検索
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map(([slug, label]) => {
            const tagsInCat = TAGS.filter((t) => t.category === slug);
            const topTags = tagsInCat
              .map((t) => ({ ...t, count: tagCounts.get(t.slug) ?? 0 }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 10);
            return (
              <Link
                key={slug}
                href={`/tags/${slug}`}
                className="card-hover group block rounded-xl border border-border bg-surface p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{label}</h3>
                  <span className="text-xs text-muted group-hover:text-primary">
                    {tagsInCat.length} 種 →
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topTags.slice(0, 8).map((tag) => (
                    <span
                      key={tag.slug}
                      className="rounded-full border border-border bg-bg px-2 py-0.5 text-[11px] text-muted group-hover:border-primary/40"
                    >
                      {tag.label}
                      {tag.count > 0 && (
                        <span className="ml-1 text-primary/80">{tag.count}</span>
                      )}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
