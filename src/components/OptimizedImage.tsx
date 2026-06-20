import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);


  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Placeholder */}
      <div 
        className={`absolute inset-0 bg-muted transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"}`} 
      />
      
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 relative z-10 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
    </div>
  );
}
