import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

interface ActivityCardProps {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
  onImageClick: () => void;
  className?: string;
}

export function ActivityCard({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  linkTo,
  linkText,
  onImageClick,
  className = "",
}: ActivityCardProps) {
  return (
    <article
      className={`group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${className}`}
    >
      <div
        className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
        onClick={onImageClick}
        role="button"
        tabIndex={0}
        aria-label={`Ouvrir l'image de ${title} en grand`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onImageClick();
          }
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 self-start">
          {category}
        </span>
        <h3 className="font-display text-2xl font-bold mb-4 text-foreground">{title}</h3>
        <p className="font-serif text-muted-foreground leading-relaxed mb-6">{description}</p>
        {/* @ts-ignore */}
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 mt-auto"
        >
          {linkText} <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
