import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/blog";
import { pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllTags()).map(({ slug }) => ({ tag: slug }));
}

async function resolve(params: Props["params"]) {
  const slug = (await params).tag;
  const tag = (await getAllTags()).find((t) => t.slug === slug)?.tag;
  const posts = tag ? (await getAllPosts()).filter((p) => p.tags.some((t) => tagSlug(t) === slug)) : [];
  return { slug, tag, posts };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, tag, posts } = await resolve(params);
  if (!tag) return {};
  return buildMetadata({
    title: `Articles about ${tag}`,
    description: `Technical articles by Sandip Chapagain about ${tag}.`,
    path: `/blog/tags/${slug}`,
    // Thin tag pages (a single post) stay out of the index to avoid near-duplicate content.
    noIndex: posts.length < 2,
  });
}

export default async function TagPage({ params }: Props) {
  const { slug, tag, posts } = await resolve(params);
  if (!tag || posts.length === 0) notFound();

  const path = `/blog/tags/${slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: tag, path },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: `Articles about ${tag}`,
          description: `Technical articles about ${tag}.`,
          type: "CollectionPage",
          crumbs,
        })}
      />
      <PageHeader eyebrow="Topic" title={`Articles about ${tag}`} crumbs={crumbs} />
      <Container className="py-14">
        <div className="border-t border-border">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} headingLevel="h2" />
          ))}
        </div>
      </Container>
    </>
  );
}
