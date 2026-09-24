import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { TagList } from "@/components/ui/Tag";
import { education, institutionLabel } from "@/content/profile";
import { experience, experienceTodo } from "@/content/experience";
import { getProject } from "@/content/projects";
import { pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { isTodo, known } from "@/lib/todo";

const title = "Experience";
const description =
  "Professional experience of Sandip Chapagain: founder of A1 IT Innovation Pvt. Ltd., contributing backend, DevOps and system design work to projects including Tufan Ride and T-Meet. BCA and MIT from Tribhuvan University.";

export const metadata = buildMetadata({ title, description, path: "/experience" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
];

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/experience", title, description, crumbs })} />
      <PageHeader eyebrow="Experience" title="Experience and education" description={description} crumbs={crumbs} />

      <Container className="py-14">
        <section aria-labelledby="work-heading">
          <h2 id="work-heading" className="text-2xl font-semibold tracking-tight text-fg">
            Work
          </h2>
          <ol className="mt-8 space-y-10 border-l border-border pl-6 sm:pl-8">
            {experience.map((role) => (
              <li key={`${role.organization}-${role.title}`} className="relative">
                <span aria-hidden="true" className="absolute -left-[1.85rem] top-2 size-2.5 rounded-full bg-accent sm:-left-[2.35rem]" />
                <article>
                  <h3 className="text-lg font-semibold text-fg">
                    {role.title},{" "}
                    {role.organizationUrl ? (
                      <a href={role.organizationUrl} rel="noopener" className="underline decoration-accent underline-offset-4">
                        {role.organization}
                      </a>
                    ) : (
                      role.organization
                    )}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {[known(role.period), role.location].filter(Boolean).join(" · ")}
                  </p>
                  <Placeholder todo={role.period} />
                  <p className="mt-4 max-w-2xl leading-relaxed text-fg-soft">{role.summary}</p>
                  {isTodo(role.highlights) ? (
                    <Placeholder todo={role.highlights} />
                  ) : (
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-border-strong">
                      {role.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {role.projectSlugs && (
                    <p className="mt-4 text-sm text-muted">
                      Related:{" "}
                      {role.projectSlugs.map((slug, i) => {
                        const p = getProject(slug);
                        return p ? (
                          <span key={slug}>
                            {i > 0 && ", "}
                            <Link href={`/projects/${slug}`} className="text-fg underline decoration-accent underline-offset-4">
                              {p.name}
                            </Link>
                          </span>
                        ) : null;
                      })}
                    </p>
                  )}
                  <div className="mt-5">
                    <TagList items={role.technologies} label="Technologies" />
                  </div>
                </article>
              </li>
            ))}
          </ol>
          <Placeholder todo={experienceTodo} />
        </section>

        <section aria-labelledby="education-heading" className="mt-20">
          <h2 id="education-heading" className="text-2xl font-semibold tracking-tight text-fg">
            Education
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {education.map((d) => (
              <li key={d.id} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{d.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {[d.abbreviation, known(d.year), d.status].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 text-sm text-fg-soft">{institutionLabel(d)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.description}</p>
                <Placeholder todo={d.institution} />
                <Placeholder todo={d.year} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
