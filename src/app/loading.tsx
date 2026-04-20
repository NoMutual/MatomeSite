export default function Loading() {
  return (
    <div className="space-y-12">
      <div className="h-64 animate-pulse rounded-2xl border border-border bg-surface-2 md:h-72" />
      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded bg-surface-2" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="aspect-video animate-pulse bg-surface-2" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
