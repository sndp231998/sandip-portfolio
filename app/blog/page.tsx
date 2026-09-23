import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { ids, pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const title = "Technical Blog";
const description =
  "Technical articles by Sandip Chapagain on Java, Spring Boot, microservices, Kafka, RabbitMQ, Redis, Docker, Kubernetes, DevOps, system design and Nepali language technology.";

export const metadata = buildMetadata({ title, description, path: "/blog" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

const plannedTopics = [
  "Spring Boot",
  "Microservices",
  "Kafka & RabbitMQ",
  "Redis",
  "Docker & Kubernetes",
  "GitHub Actions",
  "System design",
  "Geolocation systems",
  "Ride-sharing architecture",
  "Flutter",
  "LLMs & NLP",
  "Nepali language technology",
];

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <>
      <JsonLd
        data={pageGraph(
          { path: "/blog", title, description, type: "CollectionPage", crumbs },
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog")}#blog`,
            name: `${title} — Sandip Chapagain`,
            url: absoluteUrl("/blog"),
            author: { "@id": ids.person },
            blogPost: posts.map((p) => ({ "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article` })),
          },
        )}
      />
      <PageHeader
        eyebrow="Blog"
        title="Technical writing"
        description="Articles about the systems I build and the tools I use: backend architecture, messaging, infrastructure, and language technology."
        crumbs={crumbs}
      >
        <p className="mt-6 text-sm text-muted">
          Subscribe via{" "}
          <a href="/feed.xml" className="text-fg underline decoration-accent underline-offset-4">
            RSS
          </a>
          .
        </p>
      </PageHeader>

      <Container className="py-14">
        {tags.length > 0 && (
          <nav aria-label="Topics" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {tags.map(({ tag, slug, count }) => (
                <li key={tag}>
                  <Link
                    href={`/blog/tags/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-fg-soft hover:border-border-strong hover:text-fg"
                  >
                    {tag} <span className="font-mono text-xs text-muted">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {posts.length > 0 ? (
          <div className="border-t border-border">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <section aria-labelledby="coming-heading" className="rounded-2xl border border-dashed border-border-strong p-8">
            <h2 id="coming-heading" className="text-lg font-semibold text-fg">
              First articles coming soon
            </h2>
            <p className="mt-2 text-muted">Topics I plan to write about:</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {plannedTopics.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-fg-soft">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
