import Link from "next/link";
import { notFound } from "next/navigation";
import { TAG_CATEGORY_LABEL, getTagsByCategory } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";

type Props = { params: Promise<{ category: string }> };

export default async function TagCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!(category in TAG_CATEGORY_LABEL)) notFound();
  const cat = category as TagCategory;
  const tags = getTagsByCategory(cat);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">{TAG_CATEGORY_LABEL[cat]}</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${cat}/${tag.slug}`}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:border-accent/60"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
