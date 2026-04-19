import { fetchAmateurItems } from "@/lib/dmm";
import { WorkCard } from "@/components/WorkCard";

export const revalidate = 60 * 60 * 3;

type Props = {
  searchParams: Promise<{ sort?: string; keyword?: string; offset?: string }>;
};

export default async function WorksPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = (params.sort as "date" | "rank" | "review") ?? "date";
  const offset = params.offset ? Math.max(1, Number(params.offset)) : 1;
  const keyword = params.keyword ?? undefined;

  let items: Awaited<ReturnType<typeof fetchAmateurItems>>["items"] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const result = await fetchAmateurItems({ hits: 48, sort, keyword, offset });
    items = result.items;
    total = result.total_count;
  } catch (e) {
    error = e instanceof Error ? e.message : "不明なエラー";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">作品を探す</h1>

      <form className="flex gap-2" action="/works" method="get">
        <input
          name="keyword"
          defaultValue={keyword}
          placeholder="キーワード検索"
          className="flex-1 rounded border border-border bg-surface px-3 py-2 text-sm"
        />
        <select
          name="sort"
          defaultValue={sort}
          className="rounded border border-border bg-surface px-2 text-sm"
        >
          <option value="date">新着順</option>
          <option value="rank">人気順</option>
          <option value="review">レビュー順</option>
        </select>
        <button
          type="submit"
          className="rounded bg-accent px-4 text-sm font-medium text-white"
        >
          検索
        </button>
      </form>

      {error && (
        <div className="rounded border border-border bg-surface p-4 text-sm text-muted">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="text-xs text-muted">全 {total.toLocaleString()} 件</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <WorkCard key={item.content_id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
