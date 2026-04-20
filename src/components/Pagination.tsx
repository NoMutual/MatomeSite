import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function Pagination({ currentPage, totalPages, buildHref }: Props) {
  if (totalPages <= 1) return null;
  const prev = Math.max(1, currentPage - 1);
  const next = Math.min(totalPages, currentPage + 1);

  const pages: (number | "…")[] = [];
  const push = (p: number | "…") => {
    if (pages[pages.length - 1] !== p) pages.push(p);
  };
  push(1);
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      if (i > (pages[pages.length - 1] as number) + 1) push("…");
      push(i);
    }
  }
  if (totalPages > 1) {
    if (totalPages > (pages[pages.length - 1] as number) + 1) push("…");
    push(totalPages);
  }

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
      <Link
        href={buildHref(prev)}
        aria-disabled={currentPage === 1}
        className={`h-9 rounded-lg border border-border bg-surface px-3 text-xs font-medium ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/50"
        }`}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        ← 前へ
      </Link>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-xs text-muted">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`h-9 min-w-9 rounded-lg border px-2 text-xs font-medium ${
              p === currentPage
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface hover:border-primary/50"
            }`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            {p}
          </Link>
        ),
      )}
      <Link
        href={buildHref(next)}
        aria-disabled={currentPage === totalPages}
        className={`h-9 rounded-lg border border-border bg-surface px-3 text-xs font-medium ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/50"
        }`}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        次へ →
      </Link>
    </nav>
  );
}
