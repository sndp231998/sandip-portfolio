import { PaperCard } from "@/components/research/PaperCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { papers, researchInterests } from "@/content/research/papers";
import { pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "Research";
const description =
  "Research interests of Sandip Chapagain: large language models, multilingual embeddings, Nepali language processing, NLP, semantic search and multilingual information retrieval.";

export const metadata = buildMetadata({ title, description, path: "/research" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
];

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/research", title, description, type: "CollectionPage", crumbs })} />
      <PageHeader
        eyebrow="Research"
        title="Research interests"
        description="Language technology for Nepali and multilingual settings: how to represent, search and retrieve text across languages, and how large language models behave on low-resource languages."
        crumbs={crumbs}
      />

      <Container className="py-14">
        <section aria-labelledby="interests-heading">
          <h2 id="interests-heading" className="text-2xl font-semibold tracking-tight text-fg">
            Areas of interest
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {researchInterests.map((r) => (
              <li key={r.title} className="bg-surface p-6">
                <h3 className="font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="publications-heading" className="mt-20">
          <h2 id="publications-heading" className="text-2xl font-semibold tracking-tight text-fg">
            Publications
          </h2>
          {papers.length > 0 ? (
            <ul className="mt-8 grid gap-5">
              {papers.map((p) => (
                <li key={p.slug}>
                  <PaperCard paper={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-2xl rounded-2xl border border-dashed border-border-strong p-6 leading-relaxed text-muted">
              No publications yet. Papers, preprints and datasets will be listed here with their abstracts, DOIs,
              code and citation information as they are released.
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
