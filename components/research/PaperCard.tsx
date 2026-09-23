import Link from "next/link";
import type { Paper } from "@/content/research/papers";

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-border-strong">
      <p className="font-mono text-xs text-muted">
        {[paper.status, paper.publication, paper.year].filter(Boolean).join(" · ")}
      </p>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
        <Link href={`/research/${paper.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {paper.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-fg-soft">{paper.authors.join(", ")}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{paper.abstract}</p>
    </article>
  );
}
