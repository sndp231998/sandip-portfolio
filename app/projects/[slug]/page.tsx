import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { Tag, TagList } from "@/components/ui/Tag";
import { getProject, projects, type Project } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";
import { pageGraph, projectNode, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { isTodo, known, showPlaceholders, type Maybe } from "@/lib/todo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: project.technologies,
  });
}

const sectionOrder: { key: keyof Project["sections"]; title: string }[] = [
  { key: "problem", title: "Problem" },
  { key: "solution", title: "Solution" },
  { key: "architecture", title: "Architecture" },
  { key: "contribution", title: "My contribution" },
  { key: "challenges", title: "Technical challenges" },
  { key: "results", title: "Results" },
  { key: "lessons", title: "Lessons learned" },
];

/** A section is shown when it has content, or (in dev only) when it is a placeholder. */
function isVisible(value: Maybe<unknown[]>) {
  return isTodo(value) ? showPlaceholders : value.length > 0;
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.name, path },
  ];
  const url = known(project.url);
  const period = known(project.period);
  const sections = sectionOrder.filter((s) => isVisible(project.sections[s.key]));
  const relatedPosts = (await getAllPosts()).filter((p) => project.relatedPosts?.includes(p.slug));
  const entity = projectNode(project);

  return (
    <>
      <JsonLd
        data={pageGraph(
          {
            path,
            title: project.name,
            description: project.summary,
            crumbs,
            about: { "@id": entity["@id"] },
          },
          // The Organization node is already emitted site-wide; products get their own node.
          ...(project.category === "Company" ? [] : [entity]),
        )}
      />

      <PageHeader eyebrow={project.category} title={project.name} description={project.summary} crumbs={crumbs}>
        <dl className="mt-8 grid max-w-3xl gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs text-muted">Role</dt>
            <dd className="mt-1 text-fg">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted">Status</dt>
            <dd className="mt-1 text-fg">
              {project.status}
              {period && <span className="text-muted"> · {period}</span>}
            </dd>
          </div>
          {project.via && (
            <div>
              <dt className="font-mono text-xs text-muted">Through</dt>
              <dd className="mt-1">
                <a href={project.via.url} rel="noopener" className="text-fg underline decoration-accent underline-offset-4">
                  {project.via.name}
                </a>
              </dd>
            </div>
          )}
          {url && (
            <div>
              <dt className="font-mono text-xs text-muted">Website</dt>
              <dd className="mt-1">
                <a href={url} rel="noopener" className="inline-flex items-center gap-1 text-fg underline decoration-accent underline-offset-4">
                  {url.replace(/^https?:\/\//, "")} <ArrowUpRight className="size-3.5" />
                </a>
              </dd>
            </div>
          )}
        </dl>
        <Placeholder todo={project.url} />
        <Placeholder todo={project.period} />
      </PageHeader>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_16rem]">
        <article className="min-w-0">
          <p className="mb-10 rounded-xl border border-border bg-surface-2 px-5 py-4 text-sm leading-relaxed text-fg-soft">
            <span className="font-semibold text-fg">Relationship to this project:</span> {project.relationship}
          </p>

          {project.features && (
            <section aria-labelledby="features" className="mb-12">
              <h2 id="features" className="text-2xl font-semibold tracking-tight text-fg">
                What the system does
              </h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-fg-soft">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sections.map(({ key, title }) => {
            const value = project.sections[key];
            return (
              <section key={key} id={key} aria-labelledby={`${key}-heading`} className="mb-12 scroll-mt-24">
                <h2 id={`${key}-heading`} className="text-2xl font-semibold tracking-tight text-fg">
                  {title}
                </h2>
                {isTodo(value) ? (
                  <Placeholder todo={value} />
                ) : key === "architecture" ? (
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {(value as Exclude<Project["sections"]["architecture"], { __todo: true }>).map((block) => (
                      <li key={block.title} className="rounded-xl border border-border bg-surface p-5">
                        <h3 className="font-semibold text-fg">{block.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{block.body}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {block.technologies.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 space-y-4 leading-relaxed text-fg-soft">
                    {(value as string[]).map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-heading" className="border-t border-border pt-10">
              <h2 id="related-heading" className="text-xl font-semibold text-fg">
                Related articles
              </h2>
              <ul className="mt-4 space-y-2">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-fg underline decoration-accent underline-offset-4">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">On this page</p>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.key}>
                  <a href={`#${s.key}`} className="text-fg-soft hover:text-fg">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Technologies</p>
            <div className="mt-3">
              <TagList items={project.technologies} label="Technologies used" />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
