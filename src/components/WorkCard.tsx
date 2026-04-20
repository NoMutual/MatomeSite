import Link from "next/link";
import type { DugaItem } from "@/lib/types";
import {
  getReleaseDate,
  getReviewScore,
  getSampleMovieUrl,
  getThumbnail,
} from "@/lib/duga";
import { TAG_BY_SLUG } from "@/lib/tags";
import { getTagsForWork } from "@/lib/work-tags-store";
import { HoverPreviewVideo } from "./HoverPreviewVideo";

type Props = {
  item?: DugaItem;
  work?: {
    productid: string;
    title: string;
    date: string;
    thumbnail?: string;
    price?: string;
    review?: { average: string; count: number };
    performer?: string[];
    tags?: string[];
    sampleMovie?: string;
  };
};

/**
 * 作品カード。DugaItem または TaggedWork から表示できる。
 */
export function WorkCard({ item, work }: Props) {
  const data = item
    ? {
        productid: item.productid,
        title: item.title,
        date: getReleaseDate(item),
        thumbnail: getThumbnail(item),
        sampleMovie: getSampleMovieUrl(item),
        review: getReviewScore(item),
        performer: item.performer?.map((p) => p.name),
        tags: getTagsForWork(item.productid),
      }
    : work!;

  const isNew = isWithinDays(data.date, 7);
  const displayTags = (data.tags ?? [])
    .map((slug) => TAG_BY_SLUG.get(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <Link
      href={`/works/${data.productid}`}
      className="card-hover group block overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        <HoverPreviewVideo
          thumbnail={data.thumbnail}
          videoUrl={data.sampleMovie}
          alt={data.title}
        />
        {isNew && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-danger px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
            NEW
          </span>
        )}
        {data.review && (
          <span className="absolute right-2 top-2 z-10 flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur">
            <span className="text-accent">★</span>
            <span>{data.review.average}</span>
          </span>
        )}
      </div>

      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-text md:text-[14px]">
          {data.title}
        </h3>

        {data.performer && data.performer.length > 0 && (
          <div className="line-clamp-1 text-xs text-muted">
            {data.performer.slice(0, 3).join(" / ")}
          </div>
        )}

        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayTags.slice(0, 3).map((t) => (
              <span
                key={t.slug}
                className="rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary"
              >
                {t.label}
              </span>
            ))}
            {displayTags.length > 3 && (
              <span className="text-[10px] text-muted">+{displayTags.length - 3}</span>
            )}
          </div>
        )}

        <div className="pt-1">
          <span className="text-[10px] text-muted">{data.date}</span>
        </div>
      </div>
    </Link>
  );
}

function isWithinDays(dateStr: string, days: number): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  return Date.now() - date.getTime() < days * 86400000;
}
