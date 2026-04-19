import Link from "next/link";
import { TAGS, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getTagCounts } from "@/lib/work-tags-store";

export default function TagsIndexPage() {
  const categories = Object.keys(TAG_CATEGORY_LABEL) as TagCategory[];
  const counts = getTagCounts();

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <h1 className="text-3xl font-black md:text-4xl">タグ一覧</h1>
        <p className="mt-2 text-sm text-muted">
          4つの軸 × {TAGS.length} タグで、素人系を掛け合わせ検索
        </p>
      </div>

      {categories.map((cat) => {
        const tagsInCat = TAGS.filter((t) => t.category === cat);
        return (
          <section key={cat}>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-lg font-bold md:text-xl">
                {TAG_CATEGORY_LABEL[cat]}
              </h2>
              <Link
                href={`/tags/${cat}`}
                className="text-xs font-medium text-primary hover:text-primary-2"
              >
                詳しく見る →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagsInCat.map((tag) => {
                const count = counts.get(tag.slug) ?? 0;
                return (
                  <Link
                    key={tag.slug}
                    href={`/tags/${cat}/${tag.slug}`}
                    className={`group rounded-full border px-3 py-1.5 text-xs transition ${
                      count > 0
                        ? "border-primary/30 bg-primary/5 text-text hover:border-primary hover:bg-primary/15"
                        : "border-border bg-surface text-muted hover:border-muted"
                    }`}
                  >
                    {tag.label}
                    {count > 0 && (
                      <span className="ml-1.5 text-primary">{count}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
