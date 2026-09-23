import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { getAllPosts, getPost, tagSlug } from "@/lib/blog";
import { articleNode, pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    canonical: post.canonical,
    type: "article",
    keywords: post.tags,
    article: { publishedTime: post.publishedAt, modifiedTime: post.updatedAt, tags: post.tags },
    noIndex: post.draft,
  });
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const { Content } = post;

  return (
    <>
      <JsonLd data={pageGraph({ path, title: post.title, description: post.description, crumbs }, articleNode(post))} />

      <Container className="max-w-3xl pb-10 pt-10 sm:pt-14">
        <article>
          <header className="border-b border-border pb-10">
            <Breadcrumbs crumbs={crumbs} />
            {post.draft && (
              <p className="mt-6 inline-block rounded bg-amber-500/15 px-2 py-1 font-mono text-xs text-amber-700 dark:text-amber-300">
                Draft — visible in development only
              </p>
            )}
            <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
              <span>
                By{" "}
                <Link href="/about" rel="author" className="text-fg-soft underline underline-offset-4 hover:text-fg">
                  {profile.name}
                </Link>
              </span>
              <span>
                Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              )}
              <span>{post.readingMinutes} min read</span>
            </div>
            <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    href={`/blog/tags/${tagSlug(t)}`}
                    className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[0.72rem] text-fg-soft hover:text-fg"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </header>

          <div className="prose max-w-none py-10 prose-headings:font-semibold prose-h2:text-2xl prose-pre:overflow-x-auto">
            <Content />
          </div>

          <footer className="rounded-2xl border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">About the author</p>
            <p className="mt-3 font-semibold text-fg">{profile.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{profile.summary}</p>
            <Link href="/about" className="mt-3 inline-block text-sm text-fg underline decoration-accent underline-offset-4">
              More about Sandip
            </Link>
          </footer>
        </article>
      </Container>
    </>
  );
}
