import { notFound } from "next/navigation";
import { TAG_BY_SLUG, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getWorksByTag } from "@/lib/work-tags-store";
import { WorkCard } from "@/components/WorkCard";

type Props = { params: Promise<{ category: string; slug: string }> };

export default async function TagDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const tag = TAG_BY_SLUG.get(slug);
  if (!tag || tag.category !== (category as TagCategory)) notFound();

  const works = getWorksByTag(slug);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <div className="text-xs tracking-wider text-primary uppercase">
          {TAG_CATEGORY_LABEL[tag.category]}
        </div>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">{tag.label}</h1>
        <p className="mt-3 text-sm text-muted">
          該当作品: <span className="font-bold text-text">{works.length}</span> 件
        </p>
      </div>

      {works.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          <p className="font-medium text-text">まだ対応作品がありません</p>
          <p className="mt-2">
            ローカルで{" "}
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">npm run tag</code>{" "}
            を実行してタグ付けデータを生成してください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {works.map((w) => (
            <WorkCard key={w.cid} work={w} />
          ))}
        </div>
      )}
    </div>
  );
}
