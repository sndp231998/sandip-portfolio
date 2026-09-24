import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { company, education, institutionLabel, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { researchInterests } from "@/content/research/papers";
import { skillGroups } from "@/content/skills";
import { getAllPosts } from "@/lib/blog";
import { pageGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { known } from "@/lib/todo";

export const metadata = buildMetadata({
  description: profile.summary,
  path: "/",
});

const identity: [string, string][] = [
  ["name", profile.name],
  ["role", profile.jobTitle],
  ["founder of", company.name],
  ["based in", profile.location.country],
  ["education", education.map((d) => d.abbreviation).reverse().join(" · ")],
  ["works with", "Java · Spring Boot · Kafka · Kubernetes"],
];

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={pageGraph({ path: "/", title: profile.name, description: profile.summary })} />

      {/* ---------- Hero ---------- */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          {/* Not animated: the hero text is the LCP element and must paint immediately. */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {profile.roles.join(" • ")}
            </p>
            <h1 id="hero-heading" className="mt-5 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-soft">{profile.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">
                View projects <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                About me
              </ButtonLink>
              <ButtonLink href="/blog" variant="ghost">
                Read my articles
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact
              </ButtonLink>
            </div>
          </div>

          <aside
            aria-label="Profile summary"
            className="animate-fade-up rounded-2xl border border-border bg-surface/90 shadow-sm backdrop-blur [animation-delay:120ms]"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-strong" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-strong" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 font-mono text-xs text-muted">~/whoami</span>
            </div>
            <dl className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 p-5 font-mono text-[0.8rem]">
              {identity.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      {/* ---------- What I build ---------- */}
      <Section
        id="what-i-build"
        eyebrow="What I build"
        title="Backend systems, the infrastructure under them, and the apps on top"
        description="Most of my work is server-side Java. I also handle deployment and operations, and build the web and mobile clients when a project needs them."
        action={
          <Link href="/skills" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
            How I use these tools <ArrowRight />
          </Link>
        }
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <li key={g.id} className="bg-surface p-6">
              <h3 className="font-semibold text-fg">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.body}</p>
              <p className="mt-4 font-mono text-xs text-fg-soft">{g.technologies.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Projects ---------- */}
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects"
        description="Case studies covering the problem, the architecture, and my part in the work."
        className="border-t border-border"
        action={
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
            All projects <ArrowRight />
          </Link>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* ---------- Company ---------- */}
      <Section
        id="a1-it-innovation"
        eyebrow="Company"
        title={company.name}
        className="border-t border-border"
        description={
          <p>
            I founded {company.shortName}, a software development and IT solutions company in {company.country}. The
            company works on:
          </p>
        }
        action={
          <a
            href={company.url}
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent"
          >
            a1itinnovation.com.np <ArrowUpRight />
          </a>
        }
      >
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {company.focusAreas.map((a) => (
            <li key={a.title} className="border-l-2 border-accent/40 pl-4">
              <h3 className="text-sm font-semibold text-fg">{a.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Read more on the{" "}
          <Link href="/projects/a1-it-innovation" className="text-fg underline decoration-accent underline-offset-4">
            A1 IT Innovation page
          </Link>
          .
        </p>
      </Section>

      {/* ---------- Education & research ---------- */}
      <Section id="background" eyebrow="Background" title="Education and research interests" className="border-t border-border">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Education</h3>
            <ol className="mt-5 space-y-4">
              {education.map((d) => (
                <li key={d.id} className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-semibold text-fg">
                    {d.name} <span className="font-mono text-sm font-normal text-muted">({d.abbreviation})</span>
                  </p>
                  <p className="mt-1 text-sm text-fg-soft">{institutionLabel(d)}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {[known(d.year), d.status].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Research interests</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {researchInterests.map((r) => (
                <li key={r.title} className="rounded-full border border-border px-3 py-1.5 text-sm text-fg-soft">
                  {r.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              I am especially interested in language technology for Nepali: multilingual embeddings, semantic search
              and retrieval across Nepali and English.{" "}
              <Link href="/research" className="text-fg underline decoration-accent underline-offset-4">
                Research page
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Writing ---------- */}
      <Section
        id="writing"
        eyebrow="Writing"
        title="Technical articles"
        description="Notes and deep dives on the systems I work with: Java, Spring Boot, messaging, Kubernetes, system design and language technology."
        className="border-t border-border"
        action={
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
            All articles <ArrowRight />
          </Link>
        }
      >
        {posts.length > 0 ? (
          <div className="border-t border-border">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border-strong p-6 text-sm text-muted">
            The first articles are being written. Subscribe to the{" "}
            <a href="/feed.xml" className="text-fg underline underline-offset-4">
              RSS feed
            </a>{" "}
            to get them when they are published.
          </p>
        )}
      </Section>

      {/* ---------- Contact ---------- */}
      <section aria-labelledby="contact-heading" className="border-t border-border py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Working on something similar?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              I am happy to talk about backend systems, infrastructure, or a project you are planning.
            </p>
          </div>
          <ButtonLink href="/contact">
            Get in touch <ArrowRight />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
