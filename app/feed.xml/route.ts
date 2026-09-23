import { profile, site } from "@/content/profile";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** RSS 2.0 feed of published blog posts. */
export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.draft);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(p.description)}</description>
      <pubDate>${new Date(`${p.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escape(profile.name)}</dc:creator>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(profile.name)} — Technical Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${escape(`Technical articles by ${profile.name} on Java, backend systems, DevOps and language technology.`)}</description>
    <language>${site.language}</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].updatedAt ?? posts[0].publishedAt}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
