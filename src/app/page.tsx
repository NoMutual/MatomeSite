import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";
import { TAG_CATEGORY_LABEL, TAGS } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getAllTaggedWorks, getTagCounts } from "@/lib/work-tags-store";

/** ランダム並びを毎リクエストで変えるため ISR キャッシュを無効化 */
export const dynamic = "force-dynamic";

const PICK_SIZE = 24;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function HomePage() {
  // 極みタグが付いている作品からランダムに PICK_SIZE 件
  const tagged = getAllTaggedWorks().filter((w) => w.tags.length > 0);
  const works = shuffle(tagged).slice(0, PICK_SIZE);

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
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
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

      {/* 今日のピック（ランダム） */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">今日のピック</h2>
            <p className="mt-1 text-xs text-muted">
              極みタグ付きの作品から {PICK_SIZE} 件をランダム表示・訪れるたびに変わります
            </p>
          </div>
          <Link
            href="/works"
            className="text-xs font-medium text-primary hover:text-primary-2"
          >
            全作品を見る →
          </Link>
        </div>

        {works.length === 0 && (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm">
            <p className="font-medium text-text">
              タグ付き作品がまだありません
            </p>
            <p className="mt-1 text-muted">
              データは 3 時間ごとに自動更新されます。
            </p>
          </div>
        )}

        {works.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {works.map((w) => (
              <WorkCard key={w.productid} work={w} />
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
