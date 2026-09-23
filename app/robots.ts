import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

/**
 * All crawlers — search engines and AI/LLM crawlers alike — may index the
 * whole site. Nothing here is private, and being understood by AI search is a
 * goal of this site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
