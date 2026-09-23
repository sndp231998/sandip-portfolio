import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { papers } from "@/content/research/papers";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const published = posts.filter((p) => !p.draft);
  const latestPost = published[0]?.updatedAt ?? published[0]?.publishedAt;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/about"), priority: 0.9 },
    { url: absoluteUrl("/projects"), priority: 0.8 },
    { url: absoluteUrl("/blog"), priority: 0.8, lastModified: latestPost },
    { url: absoluteUrl("/research"), priority: 0.7 },
    { url: absoluteUrl("/experience"), priority: 0.6 },
    { url: absoluteUrl("/skills"), priority: 0.6 },
    { url: absoluteUrl("/contact"), priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), priority: 0.8 })),
    ...published.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ?? p.publishedAt,
      priority: 0.7,
    })),
    // Only tag pages that are indexable (2+ posts).
    ...tags.filter((t) => t.count >= 2).map((t) => ({ url: absoluteUrl(`/blog/tags/${t.slug}`), priority: 0.4 })),
    ...papers.map((p) => ({ url: absoluteUrl(`/research/${p.slug}`), lastModified: p.datePublished, priority: 0.7 })),
  ];
}
