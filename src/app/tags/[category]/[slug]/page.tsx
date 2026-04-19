import { notFound } from "next/navigation";
import { TAG_BY_SLUG, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";

type Props = { params: Promise<{ category: string; slug: string }> };

export default async function TagDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const tag = TAG_BY_SLUG.get(slug);
  if (!tag || tag.category !== (category as TagCategory)) notFound();

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted">{TAG_CATEGORY_LABEL[tag.category]}</div>
      <h1 className="text-2xl font-bold">{tag.label}</h1>

      <div className="rounded border border-border bg-surface p-4 text-sm text-muted">
        <p className="font-medium text-text">この作品一覧は開発中です</p>
        <p className="mt-2">
          独自タグ「{tag.label}」が付与された作品の一覧をここに表示します。
        </p>
        <p className="mt-1">
          現時点ではタグ付け機構（手動 or AI 支援）が未実装のため、対応作品 0 件です。
        </p>
      </div>
    </div>
  );
}
