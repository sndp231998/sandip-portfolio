import Link from "next/link";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative grid gap-2 border-b border-border py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <p className="font-mono text-xs text-muted sm:pt-1.5">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </p>
      <div>
        <Heading className="text-lg font-semibold tracking-tight text-fg group-hover:text-accent">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
          {post.draft && (
            <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 align-middle font-mono text-[0.65rem] text-amber-700 dark:text-amber-300">
              DRAFT
            </span>
          )}
        </Heading>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{post.description}</p>
        <p className="mt-3 font-mono text-xs text-muted">
          {post.readingMinutes} min read · {post.tags.slice(0, 3).join(" · ")}
        </p>
      </div>
    </article>
  );
}
