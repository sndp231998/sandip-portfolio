import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { company, education, institutionLabel, profile } from "@/content/profile";
import { researchInterests } from "@/content/research/papers";
import { ids, pageGraph, type Crumb } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { known } from "@/lib/todo";

const title = "About Sandip Chapagain";
const description =
  "Sandip Chapagain is a software developer from Nepal and founder of A1 IT Innovation Pvt. Ltd., working on Java and Spring Boot backends, distributed systems, DevOps and cloud infrastructure. BCA and MIT graduate.";

export const metadata = buildMetadata({ title: "About", description, path: "/about", type: "profile" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  const image = known(profile.image);
  const city = known(profile.location.city);

  const facts: [string, React.ReactNode][] = [
    ["Name", profile.name],
    ["Role", profile.roles.join(", ")],
    [
      "Company",
      <>
        Founder,{" "}
        <a href={company.url} rel="noopener" className="underline decoration-accent underline-offset-4">
          {company.name}
        </a>
      </>,
    ],
    ["Location", city ? `${city}, ${profile.location.country}` : profile.location.country],
    ["Education", education.map((d) => `${d.abbreviation}, ${institutionLabel(d) ?? ""}`).reverse().join("; ")],
    ["Focus", "Java, Spring Boot, distributed systems, DevOps, cloud infrastructure"],
    ["Research interests", "LLMs, multilingual embeddings, Nepali NLP, semantic search"],
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/about",
          title,
          description,
          type: "ProfilePage",
          crumbs,
          mainEntity: { "@id": ids.person },
        })}
      />

      <PageHeader eyebrow="About" title={title} description={profile.summary} crumbs={crumbs} />

      <Container className="grid gap-14 py-14 lg:grid-cols-[1fr_20rem]">
        <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-h2:text-2xl">
          <h2 id="background">Background</h2>
          <p>
            I am a software developer from Nepal. I completed a Bachelor of Computer Applications (BCA) at Damak
            Multiple Campus and a Master of Information Technology (MIT) at Bhaktapur Multiple Campus, both under
            Tribhuvan University, and I founded{" "}
            <a href={company.url} rel="noopener">
              {company.name}
            </a>
            , a software development and IT solutions company.
          </p>
          <p>
            My work sits mostly on the backend. I build services in <strong>Java</strong> with{" "}
            <strong>Spring Boot</strong>, design the REST APIs that web and mobile applications talk to, and work on
            the infrastructure that keeps those services running.
          </p>

          <h2 id="what-i-work-on">What I work on</h2>
          <p>
            <strong>Backend and distributed systems.</strong> A lot of what I build is split across multiple services.
            That brings in the usual distributed-systems questions: where state lives (MySQL for persistent data,
            Redis for fast in-memory access), and how services communicate without blocking each other (message
            brokers such as Kafka and RabbitMQ). I think about these as system-design trade-offs rather than a list of
            tools.
          </p>
          <p>
            <strong>DevOps and infrastructure.</strong> I also handle what happens after the code is written: packaging
            services with Docker, running them on Kubernetes, automating builds and deployments with CI/CD pipelines in
            GitHub Actions, and managing cloud and server infrastructure.
          </p>
          <p>
            <strong>Applications.</strong> When a project needs a client, I build cross-platform mobile apps with
            Flutter and web interfaces with React, so I can follow a feature from the database through to the screen.
          </p>
          <p>
            <strong>AI and language technology.</strong> Outside production work I experiment with AI and machine
            learning, particularly large language models and language technology for Nepali. See{" "}
            <Link href="/research">research interests</Link>.
          </p>
          <p>
            A detailed breakdown of each area is on the <Link href="/skills">skills page</Link>, and my work history is
            on the <Link href="/experience">experience page</Link>.
          </p>

          <h2 id="a1-it-innovation">A1 IT Innovation</h2>
          <p>
            I founded {company.name}, a software development and IT solutions company in Nepal. Its work covers Java
            and backend development, web and mobile applications, DevOps, cloud and server infrastructure, system
            design, software architecture, technical consulting, and AI and automation.
          </p>
          <p>
            My professional work is done through A1 IT Innovation: I contribute to the company&apos;s products and
            client projects together with the rest of the team, mainly on backend development, DevOps and system
            design. This includes <Link href="/projects/tufan-ride">Tufan Ride</Link>, a Nepal-based ride-sharing
            platform, and <Link href="/projects/t-meet">T-Meet</Link>, a video conferencing system for education and
            business meetings built in Nepal with a focus on data security.
          </p>
          <p>
            More detail: <Link href="/projects/a1-it-innovation">A1 IT Innovation</Link> ·{" "}
            <a href={company.url} rel="noopener">
              a1itinnovation.com.np
            </a>
          </p>

          <h2 id="education">Education</h2>
          <ul>
            {education.map((d) => (
              <li key={d.id}>
                <strong>
                  {d.name} ({d.abbreviation})
                </strong>
                {institutionLabel(d) && <> — {institutionLabel(d)}</>}
                {known(d.year) && <> ({known(d.year)})</>}. {d.status}.
                <Placeholder todo={d.institution} />
                <Placeholder todo={d.year} />
              </li>
            ))}
          </ul>

          <h2 id="research">Research interests</h2>
          <p>
            I am interested in {researchInterests.map((r) => r.title.toLowerCase()).join(", ")}. I would like to
            publish research in these areas, with a focus on Nepali and multilingual settings.
          </p>
        </article>

        <aside aria-labelledby="facts-heading" className="lg:sticky lg:top-24 lg:self-start">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 1024px) 320px, 100vw"
              className="mb-6 aspect-square w-full rounded-2xl border border-border object-cover"
            />
          ) : (
            <Placeholder todo={profile.image} />
          )}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 id="facts-heading" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Quick facts
            </h2>
            <dl className="mt-4 space-y-3.5 text-sm">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-0.5 text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            {profile.socials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4 text-sm">
                {profile.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="me noopener" className="text-fg underline underline-offset-4">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder todo={profile.socialsTodo} />
            )}
          </div>
        </aside>
      </Container>
    </>
  );
}
