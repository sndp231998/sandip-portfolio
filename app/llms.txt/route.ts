import { company, education, profile, site } from "@/content/profile";
import { projects } from "@/content/projects";
import { papers, researchInterests } from "@/content/research/papers";
import { getAllPosts } from "@/lib/blog";
import { known } from "@/lib/todo";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain Markdown summary of the site for LLMs and AI agents
 * (https://llmstxt.org). A convenience layer only; the HTML pages, metadata
 * and JSON-LD remain the primary source of truth.
 */
export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.draft);
  const socials = profile.socials.map((s) => `- [${s.label}](${s.url})`);

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    "## Identity",
    "",
    `- Name: ${profile.name}`,
    `- Role: ${profile.roles.join(", ")}`,
    `- Location: ${profile.location.country}`,
    `- Company: Founder of ${company.name} (${company.url})`,
    `- Education: ${education.map((d) => `${d.name} (${d.abbreviation})${known(d.institution) ? `, ${known(d.institution)}` : ""}`).join("; ")}`,
    `- Website: ${site.url}`,
    ...(socials.length ? ["", "## Profiles", "", ...socials] : []),
    "",
    "## Main pages",
    "",
    `- [About](${absoluteUrl("/about")}): Background, work, company and education`,
    `- [Experience](${absoluteUrl("/experience")}): Work history and education`,
    `- [Skills](${absoluteUrl("/skills")}): Technologies and how they are used`,
    `- [Projects](${absoluteUrl("/projects")}): Case studies`,
    `- [Blog](${absoluteUrl("/blog")}): Technical articles`,
    `- [Research](${absoluteUrl("/research")}): Research interests and publications`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.name}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.summary} Relationship: ${p.relationship}`),
    "",
    "## Research interests",
    "",
    ...researchInterests.map((r) => `- ${r.title}: ${r.body}`),
    ...(papers.length
      ? ["", "## Publications", "", ...papers.map((p) => `- [${p.title}](${absoluteUrl(`/research/${p.slug}`)})${p.year ? ` (${p.year})` : ""}`)]
      : []),
    ...(posts.length
      ? ["", "## Articles", "", ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`)]
      : []),
    "",
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    `- [RSS feed](${absoluteUrl("/feed.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
