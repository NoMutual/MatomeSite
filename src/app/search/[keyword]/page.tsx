import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { searchWorks } from "@/lib/work-tags-store";
import { WorkCard } from "@/components/WorkCard";
import { Pagination } from "@/components/Pagination";

export const revalidate = 21600;

const PER_PAGE = 48;

type Props = {
  params: Promise<{ keyword: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword } = await params;
  const kw = decodeURIComponent(keyword).trim();
  if (!kw) return { title: "検索" };
  return {
    title: `「${kw}」の素人動画検索結果`,
    description: `「${kw}」に関連する素人系作品を検索した一覧ページ。タイトル・説明文・出演者・メーカー名を対象に検索します。`,
    openGraph: {
      title: `「${kw}」の素人動画検索結果 | 素人の極み`,
      description: `素人の極みで「${kw}」に関連する作品を検索`,
      type: "website",
    },
  };
}

export default async function KeywordSearchPage({ params, searchParams }: Props) {
  const { keyword } = await params;
  const { page: pageParam } = await searchParams;
  const kw = decodeURIComponent(keyword).trim();
  if (!kw) notFound();

  const page = Math.max(1, Number(pageParam ?? 1));
  const allResults = searchWorks({ keyword: kw });
  const total = allResults.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const works = allResults.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const buildHref = (p: number) => {
    const base = `/search/${encodeURIComponent(kw)}`;
    return p > 1 ? `${base}?page=${p}` : base;
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-text">
          ホーム
        </Link>
        {" / "}
        <span className="text-text">検索: {kw}</span>
      </nav>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 md:p-8">
        <div className="text-xs tracking-wider text-primary uppercase">検索結果</div>
        <h1 className="mt-2 text-2xl font-black md:text-3xl">
          「{kw}」の素人動画
        </h1>
        <p className="mt-2 text-sm text-muted">
          該当作品: <span className="font-bold text-text">{total}</span> 件
          {totalPages > 1 && (
            <span>
              {" "}
              / ページ <span className="font-bold text-text">{page}</span> / {totalPages}
            </span>
          )}
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">
          タイトル・作品説明・出演者名・メーカー名を対象に「{kw}」で検索した結果です。
        </p>
      </div>

      {works.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          <p className="font-medium text-text">「{kw}」に該当する作品はありません</p>
          <p className="mt-2">
            別のキーワードで検索するか、
            <Link href="/works" className="text-primary hover:text-primary-2">
              タグ検索
            </Link>
            をお試しください。
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
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
  );
}
