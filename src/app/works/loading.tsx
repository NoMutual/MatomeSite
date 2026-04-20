export default function Loading() {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      <div className="hidden space-y-3 lg:block">
        <div className="h-4 w-20 animate-pulse rounded bg-surface-2" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-surface-2" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 w-full animate-pulse rounded-lg bg-surface-2" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse rounded bg-surface-2" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="aspect-[3/4] animate-pulse bg-surface-2" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
                <div className="flex gap-1">
                  <div className="h-4 w-12 animate-pulse rounded-full bg-surface-2" />
                  <div className="h-4 w-14 animate-pulse rounded-full bg-surface-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
