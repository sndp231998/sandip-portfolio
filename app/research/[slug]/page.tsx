import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagList } from "@/components/ui/Tag";
import { getPaper, papers, type Paper } from "@/content/research/papers";
import { pageGraph, paperNode, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paper = getPaper((await params).slug);
  if (!paper) return {};
  const meta = buildMetadata({
    title: paper.title,
    description: paper.abstract.slice(0, 155),
    path: `/research/${paper.slug}`,
    type: "article",
    keywords: paper.keywords,
  });
  // Google Scholar reads Highwire Press citation_* tags.
  meta.other = citationTags(paper);
  return meta;
}

function citationTags(paper: Paper): Record<string, string | string[]> {
  const tags: Record<string, string | string[]> = {
    citation_title: paper.title,
    citation_author: paper.authors,
  };
  if (paper.datePublished ?? paper.year) tags.citation_publication_date = paper.datePublished ?? String(paper.year);
  if (paper.publication) tags.citation_conference_title = paper.publication;
  if (paper.doi) tags.citation_doi = paper.doi;
  if (paper.pdf) tags.citation_pdf_url = absoluteUrl(paper.pdf);
  return tags;
}

export default async function PaperPage({ params }: Props) {
  const paper = getPaper((await params).slug);
  if (!paper) notFound();

  const path = `/research/${paper.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: paper.title, path },
  ];

  const links = [
    paper.pdf && { label: "PDF", href: paper.pdf },
    paper.doi && { label: `DOI: ${paper.doi}`, href: `https://doi.org/${paper.doi}` },
    paper.url && { label: "Publisher page", href: paper.url },
    paper.github && { label: "Code (GitHub)", href: paper.github },
    paper.dataset && { label: "Dataset", href: paper.dataset },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <JsonLd
        data={pageGraph(
          { path, title: paper.title, description: paper.abstract, crumbs, about: { "@id": `${absoluteUrl(path)}#paper` } },
          paperNode(paper),
        )}
      />
      <PageHeader
        eyebrow={[paper.status, paper.publication, paper.year].filter(Boolean).join(" · ")}
        title={paper.title}
        description={paper.authors.join(", ")}
        crumbs={crumbs}
      />
      <Container className="max-w-3xl py-14">
        <article>
          <section aria-labelledby="abstract-heading">
            <h2 id="abstract-heading" className="text-xl font-semibold text-fg">
              Abstract
            </h2>
            <p className="mt-4 leading-relaxed text-fg-soft">{paper.abstract}</p>
          </section>

          {links.length > 0 && (
            <section aria-labelledby="resources-heading" className="mt-10">
              <h2 id="resources-heading" className="text-xl font-semibold text-fg">
                Resources
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-3 py-2 text-sm text-fg hover:border-muted"
                    >
                      {l.label} <ArrowUpRight className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {paper.keywords.length > 0 && (
            <section aria-labelledby="keywords-heading" className="mt-10">
              <h2 id="keywords-heading" className="text-xl font-semibold text-fg">
                Keywords
              </h2>
              <div className="mt-4">
                <TagList items={paper.keywords} label="Keywords" />
              </div>
            </section>
          )}

          {paper.bibtex && (
            <section aria-labelledby="cite-heading" className="mt-10">
              <h2 id="cite-heading" className="text-xl font-semibold text-fg">
                Cite
              </h2>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-xs leading-relaxed text-fg">
                <code>{paper.bibtex}</code>
              </pre>
            </section>
          )}
        </article>
      </Container>
    </>
  );
}
