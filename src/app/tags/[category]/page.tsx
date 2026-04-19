import Link from "next/link";
import { notFound } from "next/navigation";
import { TAG_CATEGORY_LABEL, getTagsByCategory } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getTagCounts } from "@/lib/work-tags-store";

type Props = { params: Promise<{ category: string }> };

export default async function TagCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!(category in TAG_CATEGORY_LABEL)) notFound();
  const cat = category as TagCategory;
  const tags = getTagsByCategory(cat);
  const counts = getTagCounts();

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted">
        <Link href="/tags" className="hover:text-text">
          タグ一覧
        </Link>
        {" / "}
        <span className="text-text">{TAG_CATEGORY_LABEL[cat]}</span>
      </nav>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <div className="text-xs tracking-wider text-primary uppercase">
          カテゴリ
        </div>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          {TAG_CATEGORY_LABEL[cat]}
        </h1>
        <p className="mt-2 text-sm text-muted">{tags.length} 個のタグ</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const count = counts.get(tag.slug) ?? 0;
          return (
            <Link
              key={tag.slug}
              href={`/tags/${cat}/${tag.slug}`}
              className={`group rounded-full border px-4 py-2 text-sm transition ${
                count > 0
                  ? "border-primary/30 bg-primary/5 text-text hover:border-primary hover:bg-primary/15"
                  : "border-border bg-surface text-muted hover:border-muted"
              }`}
            >
              {tag.label}
              {count > 0 && (
                <span className="ml-1.5 text-xs text-primary">{count}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
