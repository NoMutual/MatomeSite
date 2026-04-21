import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAG_BY_SLUG, TAG_CATEGORY_LABEL } from "@/lib/tags";
import { searchWorks } from "@/lib/work-tags-store";
import { WorkCard } from "@/components/WorkCard";

export const revalidate = 21600;

type Props = { params: Promise<{ slugs: string }> };

/**
 * /combo/gyaru-nampa-hatsudori のように "-" 区切りで渡されたスラッグを展開。
 */
function parseSlugs(slugs: string): string[] {
  // URL エンコードされてる場合も考慮
  const decoded = decodeURIComponent(slugs);
  return decoded
    .split(/[-+]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params;
  const tagSlugs = parseSlugs(slugs);
  const tags = tagSlugs
    .map((s) => TAG_BY_SLUG.get(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tags.length === 0) return { title: "タグが見つかりません" };
  const labels = tags.map((t) => t.label).join(" × ");
  return {
    title: `${labels} の素人動画`,
    description: `${labels}を掛け合わせた素人系動画の一覧。DUGAから該当作品を厳選して紹介します。`,
    openGraph: {
      title: `${labels} の素人動画 | 素人の極み`,
      description: `${labels}の組み合わせで見つかる素人動画を集めたページ`,
      type: "website",
    },
  };
}

export default async function ComboPage({ params }: Props) {
  const { slugs } = await params;
  const tagSlugs = parseSlugs(slugs);
  const tags = tagSlugs
    .map((s) => TAG_BY_SLUG.get(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tags.length === 0) notFound();

  const works = searchWorks({ tags: tagSlugs });
  const labels = tags.map((t) => t.label).join(" × ");

  return (
    <div className="space-y-8">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-text">
          ホーム
        </Link>
        {" / "}
        <Link href="/tags" className="hover:text-text">
          タグ
        </Link>
        {" / "}
        <span className="text-text">{labels}</span>
      </nav>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <div className="text-xs tracking-wider text-primary uppercase">
          タグ掛け合わせ
        </div>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">{labels}</h1>
        <p className="mt-3 text-sm text-muted">
          該当作品: <span className="font-bold text-text">{works.length}</span> 件
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/tags/${t.category}/${t.slug}`}
              className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary transition hover:bg-primary hover:text-white"
            >
              {TAG_CATEGORY_LABEL[t.category]}: {t.label}
            </Link>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          「{labels}」の組み合わせで絞り込んだ素人系動画の一覧です。
          複数の条件を組み合わせて、より好みに近い作品を見つけられます。
        </p>
      </div>

      {works.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          <p className="font-medium text-text">該当作品が見つかりませんでした</p>
          <p className="mt-2">
            タグの組み合わせを緩めるか、別のタグで試してください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {works.map((w) => (
            <WorkCard key={w.productid} work={w} />
          ))}
        </div>
      )}
    </div>
  );
}
