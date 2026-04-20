import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchItemById,
  getAffiliateLink,
  getReleaseDate,
  getReviewScore,
  getSampleImages,
  getSampleMovieUrl,
  getThumbnail,
} from "@/lib/duga";
import { TAG_BY_SLUG, TAG_CATEGORY_LABEL } from "@/lib/tags";
import { getRelatedWorks, getTagsForWork } from "@/lib/work-tags-store";
import { WorkCard } from "@/components/WorkCard";
import { SampleMoviePlayer } from "@/components/SampleMoviePlayer";
import { DLsiteAdSidebar } from "@/components/DLsiteAd";

export const revalidate = 86400;

type Props = { params: Promise<{ cid: string }> };

export async function generateMetadata({ params }: Props) {
  const { cid } = await params;
  try {
    const item = await fetchItemById(cid);
    if (!item) return { title: "作品が見つかりません" };
    return { title: item.title, description: item.caption?.slice(0, 120) };
  } catch {
    return { title: "作品情報" };
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { cid: productid } = await params;
  let item;
  try {
    item = await fetchItemById(productid);
  } catch (e) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        {e instanceof Error ? e.message : "取得エラー"}
      </div>
    );
  }
  if (!item) notFound();

  const thumb = getThumbnail(item);
  const samples = getSampleImages(item);
  const sampleMovie = getSampleMovieUrl(item);
  const review = getReviewScore(item);
  const releaseDate = getReleaseDate(item);
  const affiliate = getAffiliateLink(item);

  const customTags = getTagsForWork(productid)
    .map((slug) => TAG_BY_SLUG.get(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const customTagsByCategory = new Map<string, typeof customTags>();
  for (const t of customTags) {
    if (!customTagsByCategory.has(t.category))
      customTagsByCategory.set(t.category, []);
    customTagsByCategory.get(t.category)!.push(t);
  }

  const relatedWorks = getRelatedWorks(productid, 6);

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr_200px] lg:gap-6">
      {/* 左: DLsite 広告 */}
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <DLsiteAdSidebar side="left" />
      </div>

      {/* 中央: 作品詳細 */}
      <article className="min-w-0 space-y-8">
        {/* パンくず */}
        <nav className="text-xs text-muted">
          <Link href="/" className="hover:text-text">
            ホーム
          </Link>
          {" / "}
          <Link href="/works" className="hover:text-text">
            作品
          </Link>
          {" / "}
          <span className="text-text">{productid}</span>
        </nav>

        {/* ヒーロー: 大きいトップ画像 (+再生ボタン) */}
        <SampleMoviePlayer
          thumbnail={thumb}
          videoUrl={sampleMovie}
          title={item.title}
        />

        {/* タイトル・メタ */}
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.label?.[0] && (
              <span className="rounded-md border border-border bg-bg px-2 py-0.5 text-[11px] text-muted">
                {item.label[0].name}
              </span>
            )}
            {review && (
              <span className="flex items-center gap-0.5 text-xs text-muted">
                <span className="text-accent">★</span>
                <span className="font-bold text-text">{review.average}</span>
                <span>({review.count})</span>
              </span>
            )}
            <span className="text-xs text-muted">発売 {releaseDate}</span>
            {item.makername && (
              <span className="text-xs text-muted">· {item.makername}</span>
            )}
          </div>
          <h1 className="text-2xl font-black leading-tight md:text-4xl">
            {item.title}
          </h1>
          {item.performer && item.performer.length > 0 && (
            <div className="text-sm text-muted">
              出演: {item.performer.map((p) => p.name).join(" / ")}
            </div>
          )}
        </header>

        {/* CTA */}
        <section>
          <a
            href={affiliate}
            target="_blank"
            rel="noopener sponsored"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-2 md:h-16 md:text-lg"
          >
            DUGAで見る
            <span aria-hidden>→</span>
          </a>
          <p className="mt-2 text-center text-[10px] text-muted">
            上記は広告リンク（PR）です。価格・販売状況はリンク先でご確認ください。
          </p>
        </section>

        {/* 極みタグ */}
        {customTags.length > 0 && (
          <section className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold tracking-wider text-primary uppercase">
                極みタグ（中身の特徴）
              </div>
              <span className="text-[10px] text-muted">{customTags.length} 個</span>
            </div>
            {[...customTagsByCategory.entries()].map(([cat, tags]) => (
              <div key={cat}>
                <div className="mb-1.5 text-[10px] text-muted">
                  {TAG_CATEGORY_LABEL[cat as keyof typeof TAG_CATEGORY_LABEL]}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tags/${t.category}/${t.slug}`}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm text-primary transition hover:bg-primary hover:text-white"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* DUGA カテゴリ */}
        {item.category && item.category.length > 0 && (
          <section>
            <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
              DUGA カテゴリ
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.category.map((c) => (
                <span
                  key={c.data.id}
                  className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-muted"
                >
                  {c.data.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 作品情報(説明文) */}
        {item.caption && (
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold tracking-wider text-muted uppercase">
              作品情報
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {item.caption}
            </p>
          </section>
        )}

        {/* サンプル画像 */}
        {samples.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-bold tracking-wider text-muted uppercase">
              サンプル画像
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {samples.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`sample ${i + 1}`}
                  className="w-full rounded-lg border border-border"
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        {/* 関連作品 */}
        {relatedWorks.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-bold tracking-wider text-muted uppercase">
              タグが似ている作品
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {relatedWorks.map((w) => (
                <WorkCard key={w.productid} work={w} />
              ))}
            </div>
          </section>
        )}

        {/* 再CTA */}
        <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-surface p-6 text-center md:p-8">
          <p className="text-sm text-muted">
            中身が気になったら、DUGAで詳細・サンプル動画をチェック
          </p>
          <a
            href={affiliate}
            target="_blank"
            rel="noopener sponsored"
            className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-sm font-bold text-white transition hover:bg-primary-2"
          >
            DUGAで見る
            <span aria-hidden>→</span>
          </a>
          <p className="mt-2 text-[10px] text-muted">PR / 広告</p>
        </section>
      </article>

      {/* 右: DLsite 広告 */}
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <DLsiteAdSidebar side="right" />
      </div>
    </div>
  );
}
