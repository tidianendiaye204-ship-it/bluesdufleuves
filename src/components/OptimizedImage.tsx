import { useState, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality: _quality = 85,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [webpFailed, setWebpFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const getWebPSrc = (originalSrc: string) => {
    // Only attempt webp substitution for public-folder URLs (starting with /)
    // Vite-bundled assets already have content-hash URLs and don't need this
    if (!originalSrc.startsWith("/")) return null;
    if (originalSrc.includes(".webp")) return originalSrc;
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  const webpSrc = getWebPSrc(src);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    // If webp failed, mark webp as failed (browser falls back to jpg src)
    // Always force visible so the fallback jpg can show
    setWebpFailed(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Placeholder with shimmer effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"}`}
        style={{
          backgroundSize: "200% 100%",
        }}
      />

      <picture>
        {!webpFailed && webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 relative z-10 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ imageRendering: "auto" }}
        />
      </picture>
    </div>
  );
}
