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
  title: "The Village - NANN-K - Blues du Fleuves",
  description:
    "The Village à Podor, Sénégal : village culturel unique initié par Baaba Maal. Découvrez le festival Blues du Fleuve, la musique traditionnelle et les formations du centre NANN-k.",
  ogImage: "/logo.webp",
  keywords:
    "The Village, The Village Podor, village Podor, village culturel, centre culturel Podor, Baaba Maal, Blues du Fleuve, festival Sénégal, Fouta Toro, Halpulaar, NANN-k",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStructuredData = (type: "Event" | "Organization" | "MusicEvent", data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === "Event" || type === "MusicEvent") {
    structuredData.name = data.name;
    structuredData.startDate = data.startDate;
    structuredData.endDate = data.endDate;
    structuredData.location = {
      "@type": "Place",
      name: data.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: data.city,
        addressCountry: data.country,
      },
    };
    structuredData.description = data.description;
    structuredData.image = data.image;
    structuredData.url = data.url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    structuredData.performer = data.performers?.map((performer: any) => ({
      "@type": "MusicGroup",
      name: performer.name,
    }));
    structuredData.organizer = {
      "@type": "Organization",
      name: data.organizer,
      url: data.organizerUrl,
    };
    structuredData.offers = {
      "@type": "Offer",
      url: data.ticketUrl,
      price: data.price,
      priceCurrency: data.priceCurrency || "XOF",
      availability: "https://schema.org/InStock",
    };
  }

  if (type === "Organization") {
    structuredData.name = data.name;
    structuredData.url = data.url;
    structuredData.logo = data.logo;
    structuredData.description = data.description;
    structuredData.founder = {
      "@type": "Person",
      name: data.founder,
    };
    structuredData.address = {
      "@type": "PostalAddress",
      addressLocality: data.city,
      addressCountry: data.country,
    };
    structuredData.sameAs = data.socialLinks;
  }

  return JSON.stringify(structuredData);
};
