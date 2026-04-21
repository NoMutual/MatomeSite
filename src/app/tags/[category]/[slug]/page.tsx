import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAG_BY_SLUG, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";
import { getWorksByTag } from "@/lib/work-tags-store";
import { WorkCard } from "@/components/WorkCard";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const tag = TAG_BY_SLUG.get(slug);
  if (!tag || tag.category !== (category as TagCategory)) {
    return { title: "タグが見つかりません" };
  }
  const description =
    tag.description ??
    `${tag.label}の素人系作品を集めた一覧ページ。DUGAで配信されている${tag.label}素人動画を厳選して紹介。`;
  return {
    title: `${tag.label}の素人動画一覧`,
    description: description.slice(0, 155),
    openGraph: {
      title: `${tag.label}の素人動画一覧 | 素人の極み`,
      description: description.slice(0, 200),
      type: "website",
    },
  };
}

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
        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          {tag.label}の素人動画
        </h1>
        <p className="mt-3 text-sm text-muted">
          該当作品: <span className="font-bold text-text">{works.length}</span> 件
        </p>
        {tag.description && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-[15px]">
            {tag.description}
          </p>
        )}
      </div>

      {works.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          <p className="font-medium text-text">まだ対応作品がありません</p>
          <p className="mt-2">
            データは 3 時間ごとに自動更新されます。しばらくお待ちください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.productid} work={w} />
          ))}
        </div>
      )}
    </div>
  );
}
