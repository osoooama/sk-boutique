export default function ProductSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
          <div className="aspect-[3/4] skeleton-shimmer" />
          <div className="p-3 md:p-5 space-y-3">
            <div className="h-2.5 w-16 rounded-full bg-[var(--bg-subtle)] skeleton-shimmer" />
            <div className="h-4 w-full rounded-lg bg-[var(--bg-subtle)] skeleton-shimmer" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-4 w-20 rounded-lg bg-[var(--bg-subtle)] skeleton-shimmer" />
              <div className="w-7 h-7 rounded-full bg-[var(--bg-subtle)] skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
