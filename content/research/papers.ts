/**
 * Research publications. Each entry becomes /research/[slug].
 *
 * Only add papers that exist. Leave optional fields undefined rather than
 * guessing. Example (do not uncomment until real):
 *
 * {
 *   slug: "nepali-multilingual-embeddings",
 *   title: "…",
 *   abstract: "…",
 *   authors: ["Sandip Chapagain", "Co-author Name"],
 *   publication: "Conference or journal name",
 *   year: 2027,
 *   status: "Published",
 *   doi: "10.xxxx/xxxxx",
 *   pdf: "/papers/nepali-multilingual-embeddings.pdf",
 *   github: "https://github.com/…",
 *   dataset: "https://huggingface.co/datasets/…",
 *   keywords: ["Nepali", "embeddings"],
 *   bibtex: `@inproceedings{…}`,
 * }
 */

export type Paper = {
  slug: string;
  title: string;
  abstract: string;
  authors: string[];
  publication?: string;
  year?: number;
  datePublished?: string;
  status: "Published" | "Accepted" | "Preprint" | "Under review" | "In progress";
  doi?: string;
  url?: string;
  pdf?: string;
  github?: string;
  dataset?: string;
  keywords: string[];
  bibtex?: string;
};

export const papers: Paper[] = [];

export const researchInterests = [
  {
    title: "Large language models",
    body: "How LLMs behave on low-resource languages, and how to use them reliably in real applications.",
  },
  {
    title: "Multilingual embeddings",
    body: "Representing text from different languages in a shared vector space so meaning can be compared across languages.",
  },
  {
    title: "Nepali language processing",
    body: "Tools, datasets and models for Nepali, a language that is still under-served by mainstream NLP.",
  },
  {
    title: "Natural language processing",
    body: "Core NLP problems such as tokenisation, classification and retrieval, with a practical engineering focus.",
  },
  {
    title: "Semantic search",
    body: "Search that matches meaning rather than exact keywords, built on embeddings and vector retrieval.",
  },
  {
    title: "Multilingual information retrieval",
    body: "Finding relevant documents when the query and the documents may be in different languages, such as Nepali and English.",
  },
] as const;

export function getPaper(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}
