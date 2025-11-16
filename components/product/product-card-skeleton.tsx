export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d0f13] border border-white/5 animate-pulse">
      <div className="w-full aspect-[3/4] bg-white/10" />

      <div className="p-3 space-y-2">
        <div className="w-3/4 h-3 bg-white/10 rounded" />
        <div className="w-1/2 h-3 bg-white/10 rounded" />
        <div className="w-1/3 h-4 bg-white/10 rounded mt-2" />
      </div>
    </div>
  );
}
