import React, { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  webpSrc?: string;
  alt: string;
}

/**
 * Optimized Image Component
 * Serves WebP format with JPG fallback for better performance
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, webpSrc, alt, ...props }, ref) => {
    // Convert JPG/PNG paths to WebP if not provided
    const determinedWebpSrc =
      webpSrc || (src.endsWith(".jpg") || src.endsWith(".png")) ? src.replace(/\.(jpg|png)$/i, ".webp") : undefined;

    return (
      <picture>
        {determinedWebpSrc && <source srcSet={determinedWebpSrc} type="image/webp" />}
        <img ref={ref} src={src} alt={alt} {...props} />
      </picture>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
