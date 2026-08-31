export function PageSkeleton() {
  return (
    <div className="container-page py-20">
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="h-64 md:h-96 bg-muted rounded-2xl mb-8"></div>

        {/* Title Skeleton */}
        <div className="h-12 w-3/4 md:w-1/2 bg-muted rounded-md mb-6"></div>

        {/* Content Skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-4 w-full bg-muted rounded-md"></div>
          <div className="h-4 w-full bg-muted rounded-md"></div>
          <div className="h-4 w-5/6 bg-muted rounded-md"></div>
          <div className="h-4 w-4/6 bg-muted rounded-md"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-4/3 bg-muted rounded-xl"></div>
              <div className="h-4 w-3/4 bg-muted rounded-md"></div>
              <div className="h-3 w-full bg-muted rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-4/3 bg-muted rounded-2xl mb-4"></div>
      <div className="h-6 w-3/4 bg-muted rounded-md mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted rounded-md"></div>
        <div className="h-3 w-5/6 bg-muted rounded-md"></div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse h-screen min-h-175 flex items-center justify-center">
      <div className="absolute inset-0 bg-muted"></div>
      <div className="container-page relative z-10 text-center space-y-6">
        <div className="h-8 w-48 mx-auto bg-muted/50 rounded-full"></div>
        <div className="h-20 md:h-32 w-3/4 mx-auto bg-muted/50 rounded-lg"></div>
        <div className="h-6 w-1/2 mx-auto bg-muted/50 rounded-md"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-40 bg-muted/50 rounded-full"></div>
          <div className="h-12 w-40 bg-muted/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
