import { fetchAmateurItems } from "@/lib/dmm";
import { WorkCard } from "@/components/WorkCard";
import { FacetSearch } from "@/components/FacetSearch";
import {
  getAllTaggedWorks,
  getTagCounts,
  type TaggedWork,
} from "@/lib/work-tags-store";

export const revalidate = 60 * 60 * 3;

type Props = {
  searchParams: Promise<{
    sort?: string;
    keyword?: string;
    tags?: string;
    offset?: string;
  }>;
};

export default async function WorksPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = (params.sort as "date" | "rank" | "review") ?? "date";
  const keyword = params.keyword ?? undefined;
  const selectedTags = (params.tags ?? "").split(",").filter(Boolean);
  const offset = params.offset ? Math.max(1, Number(params.offset)) : 1;

  const useLocal = selectedTags.length > 0;

  let works: TaggedWork[] = [];
  let apiItems: Awaited<ReturnType<typeof fetchAmateurItems>>["items"] = [];
  let total = 0;
  let error: string | null = null;

  if (useLocal) {
    // タグ指定時はローカル(work-tags.json)から絞り込み
    const all = getAllTaggedWorks();
    works = all.filter((w) => {
      if (!selectedTags.every((t) => w.tags.includes(t))) return false;
      if (keyword && !w.title.includes(keyword)) return false;
      return true;
    });
    if (sort === "review") {
      works.sort(
        (a, b) =>
          parseFloat(b.review?.average ?? "0") -
          parseFloat(a.review?.average ?? "0"),
      );
    } else {
      works.sort((a, b) => b.date.localeCompare(a.date));
    }
    total = works.length;
  } else {
    // デフォルトは DMM API
    try {
      const result = await fetchAmateurItems({
        hits: 48,
        sort,
        keyword,
        offset,
      });
      apiItems = result.items;
      total = result.total_count;
    } catch (e) {
      error = e instanceof Error ? e.message : "不明なエラー";
    }
  }

  const tagCounts = Object.fromEntries(getTagCounts());

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      {/* サイドバー */}
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <FacetSearch tagCounts={tagCounts} />
      </div>

      {/* 結果 */}
      <div className="min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">作品を探す</h1>
          <div className="text-xs text-muted">
            全 <span className="font-bold text-text">{total.toLocaleString()}</span> 件
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            <p className="font-medium text-text">APIから作品を取得できませんでした</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {useLocal && works.length === 0 && (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            <p className="font-medium text-text">該当作品がありません</p>
            <p className="mt-2">
              タグの組み合わせを変えるか、{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">
                npm run tag
              </code>{" "}
              でタグ付けデータを増やしてください。
            </p>
          </div>
        )}

        {useLocal && works.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {works.map((w) => (
              <WorkCard key={w.cid} work={w} />
            ))}
          </div>
        )}

        {!useLocal && apiItems.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {apiItems.map((item) => (
              <WorkCard key={item.content_id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
