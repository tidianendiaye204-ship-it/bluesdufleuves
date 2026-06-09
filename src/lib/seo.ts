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
  title: "The Village Podor | Centre Culturel par Baaba Maal - Festival Blues du Fleuve",
  description:
    "The Village à Podor, Sénégal : village culturel unique initié par Baaba Maal. Découvrez le festival Blues du Fleuve, la musique traditionnelle et les formations du centre NANN-k.",
  ogImage: "/logo.png",
  keywords:
    "The Village, The Village Podor, village Podor, village culturel, centre culturel Podor, Baaba Maal, Blues du Fleuve, festival Sénégal, Fouta Toro, Halpulaar, NANN-k",
};
