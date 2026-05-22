export function PageSkeleton() {
  return (
    <div className="container-page py-20 animate-pulse">
      <div className="h-12 w-3/4 md:w-1/2 bg-muted rounded-md mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded-md"></div>
        <div className="h-4 w-full bg-muted rounded-md"></div>
        <div className="h-4 w-5/6 bg-muted rounded-md"></div>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square bg-muted rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
