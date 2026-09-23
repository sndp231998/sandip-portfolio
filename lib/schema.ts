import { company, education, profile, site } from "@/content/profile";
import type { Project } from "@/content/projects";
import type { Paper } from "@/content/research/papers";
import type { Post } from "@/lib/blog";
import { known } from "@/lib/todo";
import { absoluteUrl } from "@/lib/utils";

/**
 * Schema.org JSON-LD builders.
 *
 * Every entity has a stable @id so that nodes emitted on different pages
 * resolve to the same thing in a search engine's knowledge graph:
 *
 *   Person  (#person)  ──worksFor──▶  Organization (#a1-it-innovation)
 *      ▲                                   │ founder
 *      └───────────────────────────────────┘
 *   WebSite (#website) ── publisher ──▶ Person
 *   Article / TechArticle ── author ──▶ Person
 *   Project page ── contributor ──▶ Person, Organization
 *   ScholarlyArticle ── author ──▶ Person
 */

type Node = Record<string, unknown>;

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  organization: `${site.url}/#${company.id}`,
} as const;

const ref = (id: string) => ({ "@id": id });

function compact<T extends Node>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)),
  ) as T;
}

export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function personNode(): Node {
  const image = known(profile.image);
  const city = known(profile.location.city);
  const alumni = education
    .map((d) => known(d.institution))
    .filter((name): name is string => Boolean(name))
    .map((name) => ({ "@type": "EducationalOrganization", name }));

  return compact({
    "@type": "Person",
    "@id": ids.person,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: site.url,
    mainEntityOfPage: absoluteUrl("/about"),
    image: image ? absoluteUrl(image.src) : undefined,
    jobTitle: profile.jobTitle,
    description: profile.summary,
    email: known(profile.email) ? `mailto:${known(profile.email)}` : undefined,
    worksFor: ref(ids.organization),
    nationality: { "@type": "Country", name: profile.location.country },
    homeLocation: {
      "@type": "Place",
      address: compact({
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: profile.location.countryCode,
      }),
    },
    alumniOf: alumni,
    hasCredential: education.map((d) =>
      compact({
        "@type": "EducationalOccupationalCredential",
        name: `${d.name} (${d.abbreviation})`,
        credentialCategory: "degree",
        educationalLevel: d.abbreviation === "MIT" ? "Master's degree" : "Bachelor's degree",
        about: d.field,
        recognizedBy: known(d.institution)
          ? { "@type": "EducationalOrganization", name: known(d.institution) }
          : undefined,
      }),
    ),
    knowsAbout: [...profile.knowsAbout],
    sameAs: profile.socials.filter((s) => s.sameAs).map((s) => s.url),
  });
}

export function organizationNode(): Node {
  return compact({
    "@type": "Organization",
    "@id": ids.organization,
    name: company.name,
    alternateName: company.shortName,
    url: company.url,
    description: company.description,
    foundingDate: known(company.foundingDate),
    founder: ref(ids.person),
    address: { "@type": "PostalAddress", addressCountry: company.countryCode },
    knowsAbout: company.focusAreas.map((a) => a.title),
  });
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    description: profile.summary,
    inLanguage: site.language,
    publisher: ref(ids.person),
    author: ref(ids.person),
  };
}

/** Site-wide entities, emitted once in the root layout. */
export function siteGraph() {
  return graph(websiteNode(), personNode(), organizationNode());
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

type WebPageInput = {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ProfilePage" | "ContactPage" | "CollectionPage";
  crumbs?: Crumb[];
  mainEntity?: Node;
  about?: Node;
};

export function webPageNode({ path, title, description, type = "WebPage", crumbs, mainEntity, about }: WebPageInput): Node {
  const url = absoluteUrl(path);
  return compact({
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: site.language,
    isPartOf: ref(ids.website),
    about: about ?? ref(ids.person),
    mainEntity,
    breadcrumb: crumbs ? ref(`${url}#breadcrumb`) : undefined,
  });
}

/** WebPage + BreadcrumbList for a regular page. */
export function pageGraph(input: WebPageInput, ...extra: Node[]) {
  const nodes: Node[] = [webPageNode(input)];
  if (input.crumbs) nodes.push(breadcrumbNode(input.path, input.crumbs));
  return graph(...nodes, ...extra);
}

export function articleNode(post: Post): Node {
  const url = post.canonical ?? absoluteUrl(`/blog/${post.slug}`);
  return compact({
    "@type": post.schemaType ?? "TechArticle",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: ref(`${absoluteUrl(`/blog/${post.slug}`)}#webpage`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: ref(ids.person),
    publisher: ref(ids.person),
    image: absoluteUrl("/opengraph-image"),
    keywords: post.tags.join(", "),
    articleSection: post.tags[0],
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: site.language,
    isPartOf: ref(ids.website),
  });
}

export function projectNode(project: Project): Node {
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);
  if (project.category === "Company") {
    // The company page describes the Organization entity itself.
    return ref(ids.organization);
  }
  return compact({
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#project`,
    name: project.name,
    description: project.summary,
    url: known(project.url),
    applicationCategory: project.applicationCategory,
    keywords: project.technologies.join(", "),
    // Contribution, not authorship: Sandip contributes via A1 IT Innovation.
    contributor: [ref(ids.person), ref(ids.organization)],
    subjectOf: ref(`${pageUrl}#webpage`),
  });
}

export function paperNode(paper: Paper): Node {
  const url = absoluteUrl(`/research/${paper.slug}`);
  return compact({
    "@type": "ScholarlyArticle",
    "@id": `${url}#paper`,
    headline: paper.title,
    name: paper.title,
    abstract: paper.abstract,
    url,
    author: paper.authors.map((name) =>
      name === profile.name ? ref(ids.person) : { "@type": "Person", name },
    ),
    datePublished: paper.datePublished ?? (paper.year ? String(paper.year) : undefined),
    isPartOf: paper.publication ? { "@type": "Periodical", name: paper.publication } : undefined,
    identifier: paper.doi ? { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi } : undefined,
    sameAs: paper.doi ? `https://doi.org/${paper.doi}` : undefined,
    keywords: paper.keywords.join(", "),
    inLanguage: site.language,
  });
}
