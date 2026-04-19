import Link from "next/link";
import { fetchAmateurItems } from "@/lib/dmm";
import { WorkCard } from "@/components/WorkCard";
import { TAG_CATEGORY_LABEL } from "@/lib/tags";

export const revalidate = 60 * 60 * 6;

export default async function HomePage() {
  let items: Awaited<ReturnType<typeof fetchAmateurItems>>["items"] = [];
  let error: string | null = null;

  try {
    const result = await fetchAmateurItems({ hits: 24, sort: "date" });
    items = result.items;
  } catch (e) {
    error = e instanceof Error ? e.message : "不明なエラー";
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold">中身が分かる、素人系作品検索</h1>
        <p className="mt-2 text-sm text-muted">
          タイトルだけじゃ分からない素人系を、女の子のタイプ・シチュエーション・撮影スタイルで絞り込んで探せます。
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-semibold">新着</h2>
          <Link href="/works" className="text-xs text-muted hover:text-text">
            もっと見る →
          </Link>
        </div>

        {error && (
          <div className="rounded border border-border bg-surface p-4 text-sm text-muted">
            <p className="font-medium text-text">APIから作品を取得できませんでした</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-xs">
              DMM アフィリエイトの審査完了後、<code>.env.local</code> に認証情報を設定してください。
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <WorkCard key={item.content_id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">タグから探す</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(TAG_CATEGORY_LABEL).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/tags/${slug}`}
              className="rounded border border-border bg-surface p-4 text-center text-sm hover:border-accent/60"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
