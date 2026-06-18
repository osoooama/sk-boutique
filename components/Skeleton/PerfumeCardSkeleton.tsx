"use client";

export default function PerfumeCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-surface-primary">
        <div className="skeleton-gold absolute inset-0" />
        <div className="absolute bottom-2 left-2">
          <div className="skeleton-gold h-5 w-12 rounded-lg" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="skeleton-gold h-4 w-2/3" />
        <div className="skeleton-gold h-3 w-full" />
        <div className="skeleton-gold h-3 w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton-gold h-4 w-16" />
          <div className="skeleton-gold h-7 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
