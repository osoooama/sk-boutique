"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-[20px] overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.15)" }}>
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-primary">
        <div className="skeleton-gold absolute inset-0" />
      </div>
      <div className="p-3 md:p-4 space-y-3">
        <div className="skeleton-gold h-4 w-3/4" />
        <div className="skeleton-gold h-3 w-1/3" />
        <div className="flex gap-1.5" dir="ltr">
          <div className="skeleton-gold w-4 h-4 rounded-full" />
          <div className="skeleton-gold w-4 h-4 rounded-full" />
          <div className="skeleton-gold w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
