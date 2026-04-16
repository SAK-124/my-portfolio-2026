export default function Loading() {
  return (
    <div className="container py-12 md:py-18">
      <div className="skeleton h-8 w-52" />
      <div className="mt-4 skeleton h-18 w-full max-w-2xl" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
      </div>
    </div>
  )
}
