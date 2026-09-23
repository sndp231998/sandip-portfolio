import type { Metadata } from "next";
import { profile, site } from "@/content/profile";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  /** Page title without the site suffix. Omit for the homepage. */
  title?: string;
  description: string;
  /** Path starting with "/". Used for the canonical URL. */
  path: string;
  /** Override the canonical (e.g. for cross-posted articles). */
  canonical?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
  };
  noIndex?: boolean;
};

const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.roles.join(" · ")}`,
};

/**
 * Builds consistent per-page metadata: unique title & description, canonical
 * URL, Open Graph and Twitter cards.
 */
export function buildMetadata({
  title,
  description,
  path,
  canonical,
  type = "website",
  keywords,
  article,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = canonical ?? absoluteUrl(path);
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.roles.join(", ")}`;

  return {
    title: title ? title : { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url, types: { "application/rss+xml": absoluteUrl("/feed.xml") } },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [defaultOgImage],
      ...(type === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [absoluteUrl("/about")],
            tags: article.tags,
          }
        : {}),
      ...(type === "profile" ? { firstName: profile.givenName, lastName: profile.familyName } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultOgImage.url],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
