import fs from "node:fs";
import path from "node:path";
import { cache, type ComponentType } from "react";

/**
 * Blog content loader.
 *
 * Posts live in /content/blog/<slug>.mdx. The file name is the slug. Each post
 * exports a `meta` object (see PostMeta) and its default export is the body.
 */

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-24". */
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  /** TechArticle for tutorials/deep dives, BlogPosting for general posts. */
  schemaType?: "TechArticle" | "BlogPosting";
  /** Drafts are visible in `next dev` only and excluded from production builds. */
  draft?: boolean;
  /** Absolute canonical URL if the article was first published elsewhere. */
  canonical?: string;
};

export type Post = PostMeta & {
  slug: string;
  readingMinutes: number;
  wordCount: number;
};

type PostModule = { default: ComponentType; meta: PostMeta };

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const includeDrafts = process.env.NODE_ENV !== "production";

function countWords(source: string): number {
  const text = source
    .replace(/^export const meta[\s\S]*?\n};?\s*$/m, " ") // strip metadata block
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/[^\s]+/g, "w")) // count code tokens as words
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

async function loadModule(slug: string): Promise<PostModule> {
  return (await import(`@/content/blog/${slug}.mdx`)) as PostModule;
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = await loadModule(slug);
      const wordCount = countWords(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      return {
        ...meta,
        slug,
        wordCount,
        readingMinutes: Math.max(1, Math.round(wordCount / 220)),
      } satisfies Post;
    }),
  );

  return posts
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export async function getPost(slug: string): Promise<(Post & { Content: ComponentType }) | undefined> {
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  if (!post) return undefined;
  const { default: Content } = await loadModule(slug);
  return { ...post, Content };
}

/** "Spring Boot" -> "spring-boot" */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllTags(): Promise<{ tag: string; slug: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
