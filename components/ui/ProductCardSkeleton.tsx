// components/ui/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="skeleton" style={{ aspectRatio: '3/4' }} />
      <div className="p-4 bg-white">
        <div className="skeleton h-2 w-16 mb-2 rounded" />
        <div className="skeleton h-4 w-3/4 mb-2 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  )
}
