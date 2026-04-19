import { notFound } from "next/navigation";
import { fetchItemByCid, getSampleImages, getThumbnail } from "@/lib/dmm";

export const revalidate = 60 * 60 * 24;

type Props = { params: Promise<{ cid: string }> };

export async function generateMetadata({ params }: Props) {
  const { cid } = await params;
  try {
    const item = await fetchItemByCid(cid);
    if (!item) return { title: "作品が見つかりません" };
    return { title: item.title, description: item.comment?.slice(0, 120) };
  } catch {
    return { title: "作品情報" };
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { cid } = await params;
  let item;
  try {
    item = await fetchItemByCid(cid);
  } catch (e) {
    return (
      <div className="rounded border border-border bg-surface p-4 text-sm text-muted">
        {e instanceof Error ? e.message : "取得エラー"}
      </div>
    );
  }
  if (!item) notFound();

  const thumb = getThumbnail(item);
  const samples = getSampleImages(item);

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-xl font-bold leading-snug">{item.title}</h1>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span>発売: {item.date?.slice(0, 10)}</span>
          {item.iteminfo?.maker?.[0] && <span>メーカー: {item.iteminfo.maker[0].name}</span>}
          {item.iteminfo?.label?.[0] && <span>レーベル: {item.iteminfo.label[0].name}</span>}
          {item.review && <span>★ {item.review.average} ({item.review.count})</span>}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr_3fr]">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt={item.title} className="w-full rounded border border-border" />
        )}
        <div className="space-y-3">
          <div className="rounded border border-border bg-surface p-4">
            <div className="text-xs text-muted">価格</div>
            <div className="mt-1 text-lg font-bold">{item.prices?.price ?? "—"}</div>
            <a
              href={item.affiliateURL || item.URL}
              target="_blank"
              rel="noopener sponsored"
              className="mt-3 block w-full rounded bg-accent py-3 text-center font-medium text-white"
            >
              FANZA で見る
            </a>
            <p className="mt-2 text-[10px] text-muted">
              上記は広告リンクです（PR）。リンク先の価格・販売状況は変動します。
            </p>
          </div>

          {item.iteminfo?.genre && item.iteminfo.genre.length > 0 && (
            <div>
              <div className="mb-1 text-xs text-muted">公式ジャンル</div>
              <div className="flex flex-wrap gap-1.5">
                {item.iteminfo.genre.map((g) => (
                  <span
                    key={g.id}
                    className="rounded border border-border bg-surface px-2 py-0.5 text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {item.comment && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-muted">作品情報</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{item.comment}</p>
        </section>
      )}

      {samples.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-muted">サンプル画像</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {samples.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`sample ${i + 1}`}
                className="w-full rounded border border-border"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
