import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eagleeye-est.com";
const ROUTES = ["", "/about", "/services", "/products", "/contact", "/rfq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) => {
    const enUrl = `${SITE_URL}${route}`;
    // Arabic locale disabled at client's request (kept for future re-enable).
    // const arUrl = `${SITE_URL}/ar${route}`;
    // const languages = { en: enUrl, ar: arUrl };

    return [
      {
        url: enUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
      },
      // {
      //   url: arUrl,
      //   lastModified,
      //   changeFrequency: "monthly" as const,
      //   priority: route === "" ? 1 : 0.8,
      //   alternates: { languages },
      // },
    ];
  });
}
