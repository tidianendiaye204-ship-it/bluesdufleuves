import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

interface NewsCardProps {
  to: string;
  imgSrc: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readMoreText: string;
  featured?: boolean;
}

export function NewsCard({
  to,
  imgSrc,
  category,
  date,
  title,
  excerpt,
  readMoreText,
  featured = false,
}: NewsCardProps) {
  if (featured) {
    return (
      <>
        {/* @ts-expect-error Bypass typing for external library */}
        <Link
          to={to}
          className="group flex flex-col md:flex-row bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500"
        >
          <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-muted/30">
            <OptimizedImage
              src={imgSrc}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
          </div>
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
              {date}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-base text-muted-foreground mb-8 font-medium leading-relaxed">
              {excerpt}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
              {readMoreText} <ChevronRight size={16} />
            </div>
          </div>
        </Link>
      </>
    );
  }

  return (
    <>
      {/* @ts-expect-error Bypass typing for external library */}
      <Link
        to={to}
        className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
          <OptimizedImage
            src={imgSrc}
            alt={title}
            className="h-full w-full object-contain object-center bg-muted transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-foreground">
              {category}
            </span>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
            {date}
          </span>
          <h3 className="font-display text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-medium leading-relaxed">
            {excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
            {readMoreText} <ChevronRight size={14} />
          </div>
        </div>
      </Link>
    </>
  );
}
