import { fetchAmateurItems } from "@/lib/duga";
import { WorkCard } from "@/components/WorkCard";
import { FacetSearch } from "@/components/FacetSearch";
import { Pagination } from "@/components/Pagination";
import { DLsiteAdSidebar } from "@/components/DLsiteAd";
import {
  getAllTaggedWorks,
  getTagCounts,
  type TaggedWork,
} from "@/lib/work-tags-store";

export const revalidate = 10800;

const PER_PAGE = 48;

type Props = {
  searchParams: Promise<{
    sort?: string;
    keyword?: string;
    tags?: string;
    page?: string;
  }>;
};

export default async function WorksPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = (params.sort as "new" | "favorite" | "rating") ?? "new";
  const keyword = params.keyword ?? undefined;
  const selectedTags = (params.tags ?? "").split(",").filter(Boolean);
  const page = Math.max(1, Number(params.page ?? 1));
  const offset = (page - 1) * PER_PAGE + 1;

  const useLocal = selectedTags.length > 0;

  let works: TaggedWork[] = [];
  let apiItems: Awaited<ReturnType<typeof fetchAmateurItems>>["items"] = [];
  let total = 0;
  let error: string | null = null;

  if (useLocal) {
    const all = getAllTaggedWorks();
    const filtered = all.filter((w) => {
      if (!selectedTags.every((t) => w.tags.includes(t))) return false;
      if (keyword && !w.title.includes(keyword)) return false;
      return true;
    });
    if (sort === "rating") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.review?.average ?? "0") -
          parseFloat(a.review?.average ?? "0"),
      );
    } else {
      filtered.sort((a, b) => b.date.localeCompare(a.date));
    }
    total = filtered.length;
    works = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  } else {
    try {
      const result = await fetchAmateurItems({
        hits: PER_PAGE,
        sort,
        keyword,
        offset,
      });
      apiItems = result.items;
      total = result.total;
    } catch (e) {
      error = e instanceof Error ? e.message : "不明なエラー";
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const tagCounts = Object.fromEntries(getTagCounts());

  const buildHref = (p: number) => {
    const u = new URLSearchParams();
    if (keyword) u.set("keyword", keyword);
    if (selectedTags.length > 0) u.set("tags", selectedTags.join(","));
    if (sort !== "new") u.set("sort", sort);
    if (p > 1) u.set("page", String(p));
    const qs = u.toString();
    return qs ? `/works?${qs}` : "/works";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr_200px] lg:gap-6">
      {/* 左: ファセット検索 */}
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <FacetSearch tagCounts={tagCounts} />
      </div>

      {/* 中央: 作品一覧 */}
      <div className="min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">作品を探す</h1>
          <div className="text-xs text-muted">
            全 <span className="font-bold text-text">{total.toLocaleString()}</span> 件
            {totalPages > 1 && (
              <span>
                {" "}
                / <span className="font-bold text-text">{page}</span> / {totalPages}
              </span>
            )}
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
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {works.map((w) => (
                <WorkCard key={w.productid} work={w} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              buildHref={buildHref}
            />
          </>
        )}

        {!useLocal && apiItems.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {apiItems.map((item) => (
                <WorkCard key={item.productid} item={item} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              buildHref={buildHref}
            />
          </>
        )}
      </div>

      {/* 右: DLsite 広告 */}
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <DLsiteAdSidebar side="right" />
      </div>
    </div>
  );
}
