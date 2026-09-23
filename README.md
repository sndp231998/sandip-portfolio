# sandipchapagain.com.np

Personal website of **Sandip Chapagain**, a software developer from Nepal and founder of A1 IT Innovation Pvt. Ltd.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and MDX. Every page is statically generated.
The only client-side JavaScript is the theme toggle and the mobile-menu auto-close.

## Commands

```bash
npm install         # install dependencies (Node 20+)
npm run dev         # http://localhost:3000, shows drafts + placeholder boxes
npm run typecheck   # TypeScript check
npm run build       # production build (static)
npm start           # serve the production build locally
```

## Project structure

```
app/                         Routes (Server Components by default)
  layout.tsx                 Root layout: fonts, theme script, site-wide JSON-LD, header/footer
  page.tsx                   Homepage
  about/ experience/ skills/ contact/
  projects/ + [slug]/        Project index + case-study template
  blog/ + [slug]/ + tags/[tag]/
  research/ + [slug]/        Research interests + paper template (ScholarlyArticle, citation_* tags)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
  llms.txt/route.ts          /llms.txt, generated from content
  feed.xml/route.ts          /feed.xml RSS
components/
  layout/                    Header, Footer, MobileNav, ThemeToggle
  ui/                        Container, Section, PageHeader, Breadcrumbs, Button, Tag, Placeholder, Icons
  seo/JsonLd.tsx
  projects/ blog/ research/  Cards
content/                     ALL site content lives here
  profile.ts                 Identity: name, role, education, company, socials (single source of truth)
  projects.ts                Case studies
  experience.ts  skills.ts
  research/papers.ts         Publications + research interests
  blog/*.mdx                 Articles
lib/
  seo.ts                     buildMetadata(): title, description, canonical, OG, Twitter
  schema.ts                  JSON-LD graph builders with stable @ids
  blog.ts                    MDX loader, reading time, tags
  todo.ts                    Placeholder mechanism
mdx-components.tsx           MDX element overrides
```

## Placeholders: how missing facts are handled

Facts that have not been confirmed are stored as `todo("hint")` instead of being made up.

- In **development** they show as dashed amber "Placeholder" boxes on the page.
- In **production** they render nothing and are left out of the JSON-LD.

To list everything still missing, run `grep -rn "todo(" content`.

## Adding content

**Blog post:** create `content/blog/my-post-slug.mdx`. The file name becomes the URL.

```mdx
export const meta = {
  title: "Idempotent payment callbacks in Spring Boot",
  description: "One or two sentences, ~150 characters, used for search results.",
  publishedAt: "2026-10-01",
  updatedAt: "2026-10-05",          // optional
  tags: ["Spring Boot", "Payments"],
  schemaType: "TechArticle",        // or "BlogPosting"
  draft: false,                     // true = dev only
  // canonical: "https://…",        // only if first published elsewhere
};

Article body in Markdown/MDX…
```

The sitemap, RSS feed, llms.txt, tag pages and Article JSON-LD all update automatically.

**Project:** add an object to `content/projects.ts`. You get `/projects/<slug>` with Problem, Solution,
Architecture, Contribution, Challenges, Results and Lessons sections. Link posts to it with `relatedPosts`.

**Paper:** add an object to `papers` in `content/research/papers.ts`. You get `/research/<slug>` with the
abstract, DOI, PDF, code and dataset links, BibTeX, and Google Scholar `citation_*` meta tags. Put PDFs in
`public/papers/`.

**Profiles (GitHub, LinkedIn, Scholar, ORCID):** add them to `profile.socials` in `content/profile.ts`.
Links marked `sameAs: true` go into the Person JSON-LD and are rendered with `rel="me"`.

**Photo:** save it as `public/images/sandip-chapagain.jpg`, then set `profile.image` to
`{ src: "/images/sandip-chapagain.jpg", alt: "Sandip Chapagain", width: 800, height: 800 }`.

**New sections (Talks, Certifications, Notes, CV):** add a data file in `content/`, a route in `app/`,
a link in `lib/navigation.ts`, and an entry in `app/sitemap.ts`.

## Deployment

**Vercel (recommended):** import the repository at vercel.com and use the default settings. Then, under
Project, Settings, Domains, add `sandipchapagain.com.np` and `www.sandipchapagain.com.np`, and set one of them to
redirect to the apex domain. Create the DNS records Vercel shows you at your `.np` DNS provider.

**Any Node host (VPS, Docker):** run `npm ci && npm run build && npm start` behind Nginx or Caddy with HTTPS.
Redirect `www` and `http` to `https://sandipchapagain.com.np`.

The site URL is set in `content/profile.ts` (`site.url`). Canonical URLs, the sitemap and JSON-LD all use it.

## SEO checklist

- [x] Unique title, description, canonical, Open Graph and Twitter metadata on every page (`lib/seo.ts`)
- [x] `/sitemap.xml` and `/robots.txt` (all crawlers allowed, including AI crawlers)
- [x] JSON-LD: WebSite, Person, Organization, WebPage/ProfilePage/CollectionPage/ContactPage,
      BreadcrumbList, TechArticle/BlogPosting, SoftwareApplication, ScholarlyArticle
- [x] Stable `@id`s: Person ↔ Organization (`worksFor`/`founder`), articles → author, projects → contributor
- [x] One `h1` per page, semantic landmarks, visible breadcrumbs, descriptive internal links
- [x] Static HTML for all content; minimal JavaScript; `next/font`; no third-party scripts
- [x] `/llms.txt`, `/feed.xml`, generated Open Graph image
- [x] Thin tag pages (fewer than 2 posts) are `noindex` and left out of the sitemap
- [ ] Replace placeholders (see below)
- [ ] Add verified `sameAs` profiles; link back to sandipchapagain.com.np from each profile
- [ ] Add a real photo (improves the Person entity and social cards)
- [ ] Publish articles regularly; link related posts and projects to each other
- [ ] Test with https://search.google.com/test/rich-results and https://validator.schema.org
- [ ] Check Core Web Vitals with PageSpeed Insights after deploying

## Google Search Console setup

1. Go to https://search.google.com/search-console, click **Add property**, choose **Domain**, and enter
   `sandipchapagain.com.np`.
2. Verify with the DNS TXT record at your domain provider. Alternatively, use the URL-prefix method and put the
   token in `verification.google` in `app/layout.tsx`.
3. Submit `https://sandipchapagain.com.np/sitemap.xml` under **Sitemaps**.
4. Use **URL Inspection** on `/`, `/about`, `/projects/tufan-ride` and **Request indexing**.
5. Under **Enhancements**, check that Breadcrumbs and any other detected structured data are valid.
6. Check **Pages** (indexing) and **Core Web Vitals** again after 1–2 weeks.
7. Optional: add the site to Bing Webmaster Tools (it can import from Search Console). Bing also powers several
   AI search products.
8. Ask for `https://sandipchapagain.com.np` to be linked from a1itinnovation.com.np (for example an
   "About the founder" link), and from your GitHub and LinkedIn profiles.
