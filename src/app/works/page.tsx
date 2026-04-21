import { WorkCard } from "@/components/WorkCard";
import { FacetSearch } from "@/components/FacetSearch";
import { Pagination } from "@/components/Pagination";
import { DLsiteAdSidebar } from "@/components/DLsiteAd";
import { getTagCounts, searchWorks } from "@/lib/work-tags-store";

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
  const sort = (params.sort as "date" | "rating" | "favorite") ?? "date";
  const keyword = params.keyword?.trim() || undefined;
  const selectedTags = (params.tags ?? "").split(",").filter(Boolean);
  const page = Math.max(1, Number(params.page ?? 1));

  const allResults = searchWorks({ tags: selectedTags, keyword, sort });
  const total = allResults.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const works = allResults.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const tagCounts = Object.fromEntries(getTagCounts());

  const buildHref = (p: number) => {
    const u = new URLSearchParams();
    if (keyword) u.set("keyword", keyword);
    if (selectedTags.length > 0) u.set("tags", selectedTags.join(","));
    if (sort !== "date") u.set("sort", sort);
    if (p > 1) u.set("page", String(p));
    const qs = u.toString();
    return qs ? `/works?${qs}` : "/works";
  };

  const activeFilterLabel = [
    keyword ? `「${keyword}」` : null,
    selectedTags.length > 0 ? `${selectedTags.length}タグ` : null,
  ]
    .filter(Boolean)
    .join(" × ");

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr_200px] lg:gap-6">
      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <FacetSearch tagCounts={tagCounts} />
      </div>

      <div className="min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">作品を探す</h1>
            {activeFilterLabel && (
              <p className="mt-1 text-xs text-muted">絞り込み: {activeFilterLabel}</p>
            )}
          </div>
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

        {works.length === 0 && (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            <p className="font-medium text-text">該当作品がありません</p>
            <p className="mt-2">
              キーワード・タグの組み合わせを変えて試してください。
              <br />
              データは 3 時間ごとに自動更新されます。
            </p>
          </div>
        )}

        {works.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-3">
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
      </div>

      <div className="lg:sticky lg:top-[4.5rem] lg:self-start">
        <DLsiteAdSidebar side="right" />
      </div>
    </div>
  );
}
