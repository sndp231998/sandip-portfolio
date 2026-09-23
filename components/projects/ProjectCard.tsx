import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>{project.category}</span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
      </div>
      <Heading className="mt-4 text-xl font-semibold tracking-tight text-fg">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {project.name}
        </Link>
      </Heading>
      <p className="mt-1 text-sm text-fg-soft">{project.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
      <p className="mt-4 text-xs text-muted">
        <span className="font-medium text-fg-soft">Role:</span> {project.role}
      </p>
      <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 6).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
        {project.technologies.length > 6 && (
          <li>
            <Tag>+{project.technologies.length - 6}</Tag>
          </li>
        )}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
        Read case study
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
