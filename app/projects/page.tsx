import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/content/projects";
import { pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const title = "Projects";
const description =
  "Software projects by Sandip Chapagain, including engineering work on the Tufan Ride ride-sharing platform and A1 IT Innovation Pvt. Ltd. Each case study covers the problem, architecture and contribution.";

export const metadata = buildMetadata({ title, description, path: "/projects" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/projects",
          title,
          description,
          type: "CollectionPage",
          crumbs,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/projects/${p.slug}`),
              name: p.name,
            })),
          },
        })}
      />
      <PageHeader
        eyebrow="Projects"
        title="Projects and case studies"
        description="What each project is, how it is built, and exactly what my role in it was."
        crumbs={crumbs}
      />
      <Container className="py-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
