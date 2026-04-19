import Link from "next/link";
import type { DmmItem } from "@/lib/types";
import { getThumbnail } from "@/lib/dmm";

export function WorkCard({ item }: { item: DmmItem }) {
  const thumb = getThumbnail(item);
  return (
    <Link
      href={`/works/${item.content_id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition hover:border-accent/60"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-black/40">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted">
          <span>{item.date?.slice(0, 10)}</span>
          {item.review && (
            <span>
              ★ {item.review.average} ({item.review.count})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
