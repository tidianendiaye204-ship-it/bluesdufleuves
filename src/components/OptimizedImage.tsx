import { useState, useRef, useEffect } from "react";
import { imagePlaceholders } from "@/data/imagePlaceholders";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
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
  objectPosition = "center",
  objectFit = "cover",
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [webpFailed, setWebpFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already loaded (e.g., from cache)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    }
    return originalSrc;
  };

  const webpSrc = getWebPSrc(src);
  const placeholder = imagePlaceholders[src] || imagePlaceholders[webpSrc];

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setWebpFailed(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur-up Placeholder */}
      {placeholder ? (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full filter blur-xl scale-110 transition-opacity duration-700 ease-in-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectFit, objectPosition }}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 transition-opacity duration-500 ${
            loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
          }`}
          style={{ backgroundSize: "200% 100%" }}
        />
      )}

      <picture>
        {!webpFailed && webpSrc && <source srcSet={encodeURI(webpSrc)} type="image/webp" />}
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
          className={`w-full h-full transition-opacity duration-700 ease-in-out relative z-10 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ imageRendering: "auto", objectFit, objectPosition }}
        />
      </picture>
    </div>
  );
}
