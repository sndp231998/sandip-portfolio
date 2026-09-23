import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagList } from "@/components/ui/Tag";
import { skillGroups } from "@/content/skills";
import { pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "Skills";
const description =
  "The technologies Sandip Chapagain works with and how they fit together: Java and Spring Boot backends, microservices, Redis, Kafka, RabbitMQ, Docker, Kubernetes, GitHub Actions, Flutter, React and AI/ML.";

export const metadata = buildMetadata({ title, description, path: "/skills" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Skills", path: "/skills" },
];

export default function SkillsPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/skills", title, description, crumbs })} />
      <PageHeader
        eyebrow="Skills"
        title="Skills and how I use them"
        description="Grouped by the kind of problem they solve rather than as a keyword list. The projects and articles show them in practice."
        crumbs={crumbs}
      />

      <Container className="py-14">
        <nav aria-label="Skill areas" className="mb-12">
          <ul className="flex flex-wrap gap-2 text-sm">
            {skillGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="rounded-full border border-border px-3 py-1.5 text-fg-soft hover:border-border-strong hover:text-fg">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="divide-y divide-border border-y border-border">
          {skillGroups.map((g, i) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="grid scroll-mt-24 gap-4 py-10 md:grid-cols-[3rem_1fr_18rem] md:gap-8">
              <p aria-hidden="true" className="font-mono text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h2 id={`${g.id}-heading`} className="text-xl font-semibold tracking-tight text-fg">
                  {g.title}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-fg-soft">{g.body}</p>
              </div>
              <TagList items={g.technologies} label={`${g.title} technologies`} />
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          See these in context in the{" "}
          <Link href="/projects/tufan-ride" className="text-fg underline decoration-accent underline-offset-4">
            Tufan Ride case study
          </Link>{" "}
          and the{" "}
          <Link href="/blog" className="text-fg underline decoration-accent underline-offset-4">
            technical blog
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
