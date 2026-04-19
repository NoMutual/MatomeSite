import Link from "next/link";
import type { DmmItem } from "@/lib/types";
import { getThumbnail } from "@/lib/dmm";
import { TAG_BY_SLUG } from "@/lib/tags";
import { getTagsForWork } from "@/lib/work-tags-store";

type Props = {
  item?: DmmItem;
  work?: {
    cid: string;
    title: string;
    date: string;
    thumbnail?: string;
    price?: string;
    review?: { average: string; count: number };
    actress?: string[];
    tags?: string[];
  };
};

/**
 * 作品カード。DmmItem または TaggedWork から表示できる。
 */
export function WorkCard({ item, work }: Props) {
  const data = item
    ? {
        cid: item.content_id,
        title: item.title,
        date: item.date?.slice(0, 10) ?? "",
        thumbnail: getThumbnail(item),
        price: item.prices?.price,
        review: item.review,
        actress: item.iteminfo?.actress?.map((a) => a.name),
        tags: getTagsForWork(item.content_id),
      }
    : work!;

  const isNew = isWithinDays(data.date, 7);
  const displayTags = (data.tags ?? [])
    .map((slug) => TAG_BY_SLUG.get(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <Link
      href={`/works/${data.cid}`}
      className="card-hover group block overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        {data.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.thumbnail}
            alt={data.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        {isNew && (
          <span className="absolute left-2 top-2 rounded-md bg-danger px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
            NEW
          </span>
        )}
        {data.review && (
          <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur">
            <span className="text-accent">★</span>
            <span>{data.review.average}</span>
          </span>
        )}
      </div>

      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-text md:text-[14px]">
          {data.title}
        </h3>

        {data.actress && data.actress.length > 0 && (
          <div className="line-clamp-1 text-xs text-muted">
            {data.actress.slice(0, 3).join(" / ")}
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

        <div className="flex items-end justify-between pt-1">
          <span className="text-[10px] text-muted">{data.date}</span>
          {data.price && (
            <span className="text-sm font-bold text-primary">{data.price}</span>
          )}
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
