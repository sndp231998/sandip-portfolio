import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { company, profile } from "@/content/profile";
import { ids, pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { known } from "@/lib/todo";

const title = "Contact";
const description =
  "How to contact Sandip Chapagain, software developer and founder of A1 IT Innovation Pvt. Ltd., about backend systems, infrastructure, collaboration or research.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const email = known(profile.email);

  const channels = [
    email && { label: "Email", value: email, href: `mailto:${email}`, note: "Best for direct enquiries.", rel: undefined },
    ...profile.socials.map((s) => ({
      label: s.label,
      value: s.url.replace(/^https?:\/\/(www\.)?/, ""),
      href: s.url,
      note: "",
      // rel="me" asserts the profile belongs to Sandip (identity verification).
      rel: "me noopener",
    })),
    {
      label: company.name,
      value: "a1itinnovation.com.np",
      href: company.url,
      note: "For company and project enquiries.",
      rel: "noopener",
    },
  ].filter(Boolean) as { label: string; value: string; href: string; note: string; rel?: string }[];

  return (
    <>
      <JsonLd
        data={pageGraph({ path: "/contact", title, description, type: "ContactPage", crumbs, mainEntity: { "@id": ids.person } })}
      />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="I am open to conversations about backend systems, infrastructure, collaboration on projects, and research in Nepali and multilingual language technology."
        crumbs={crumbs}
      />
      <Container className="py-14">
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                rel={c.rel}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.label}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-lg font-medium text-fg">
                  {c.value} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {c.note && <span className="mt-2 text-sm text-muted">{c.note}</span>}
              </a>
            </li>
          ))}
        </ul>
        <Placeholder todo={profile.email} />
        <Placeholder todo={profile.socialsTodo} />
      </Container>
    </>
  );
}
