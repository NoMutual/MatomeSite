import Link from "next/link";
import { TAGS, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";

export default function TagsIndexPage() {
  const categories = Object.keys(TAG_CATEGORY_LABEL) as TagCategory[];
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">タグ一覧</h1>
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="mb-3 text-base font-semibold">{TAG_CATEGORY_LABEL[cat]}</h2>
          <div className="flex flex-wrap gap-2">
            {TAGS.filter((t) => t.category === cat).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${cat}/${tag.slug}`}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs hover:border-accent/60"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
