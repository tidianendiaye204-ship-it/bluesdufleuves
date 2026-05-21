/**
 * SEO Metadata Helper
 * Centralized SEO meta tag generation
 */

export interface SeoMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
  canonical?: string;
}

export const createSeoMeta = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords,
  canonical,
}: SeoMeta) => {
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: ogTitle || title },
    { property: "og:description", content: ogDescription || description },
    { property: "og:type", content: ogType },
    { name: "twitter:card", content: twitterCard },
  ];

  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  const links = [];
  if (canonical) {
    links.push({ rel: "canonical", href: canonical });
  }

  return { meta, links };
};

export const DEFAULT_SEO = {
  title: "Blues du Fleuve Podor | Baaba Maal Festival",
  description:
    "Participez au festival Blues du Fleuve à Podor avec Baaba Maal. Découvrez la musique du fleuve Sénégal et la culture Halpulaar.",
  ogImage: "/logo.png",
  keywords:
    "Blues du Fleuve Podor, Baaba Maal, festival Sénégal, musique Fouta, Daande Lenol",
};
