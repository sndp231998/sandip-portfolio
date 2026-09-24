import { todo, type Maybe } from "@/lib/todo";

/**
 * Single source of truth for Sandip Chapagain's public identity.
 *
 * Every page, the metadata, the JSON-LD graph, llms.txt and the RSS feed read
 * from this file. Keep names and titles consistent here instead of editing
 * individual pages.
 */

export const site = {
  url: "https://sandipchapagain.com.np",
  name: "Sandip Chapagain",
  locale: "en_US",
  language: "en",
} as const;

export type SocialLink = {
  /** Visible label, e.g. "GitHub". */
  label: string;
  url: string;
  /** Included in Person.sameAs when true (only for profiles that represent Sandip himself). */
  sameAs: boolean;
};

export const profile = {
  name: "Sandip Chapagain",
  givenName: "Sandip",
  familyName: "Chapagain",

  /** Primary job title. Used in schema.org Person.jobTitle and page titles. */
  jobTitle: "Software Developer",
  /** Short role line shown in the hero. */
  roles: ["Software Developer", "Java Engineer", "Founder"],

  /** One-sentence identity statement. Reused in meta descriptions and llms.txt. */
  summary:
    "Sandip Chapagain is a software developer from Nepal and the founder of A1 IT Innovation Pvt. Ltd. He works mainly on Java and Spring Boot backend systems, distributed systems, DevOps and cloud infrastructure.",

  /** Slightly longer intro used on the homepage hero. */
  intro:
    "I am a software developer from Nepal and the founder of A1 IT Innovation Pvt. Ltd. I build backend systems with Java and Spring Boot, the infrastructure that runs them, and the web and mobile applications that sit on top.",

  location: {
    country: "Nepal",
    countryCode: "NP",
    city: todo("City you are based in (e.g. Kathmandu) — optional") as Maybe<string>,
  },

  /** Profile photo in /public. Leave as todo until a real photo is added. */
  image: todo("Add a professional photo at /public/images/sandip-chapagain.jpg (min. 800×800) and set the path here") as Maybe<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>,

  email: todo("Public contact email address (only if you want it published)") as Maybe<string>,

  /** Phone number, also reachable on WhatsApp. */
  phone: {
    display: "+977 981-6032025",
    e164: "+9779816032025",
    whatsapp: "https://wa.me/9779816032025",
  },

  /**
   * Sandip's own verified profiles. Entries with sameAs: true go into the
   * Person JSON-LD and are linked with rel="me".
   */
  socials: [
    { label: "GitHub", url: "https://github.com/sndp231998", sameAs: true },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sandip-chapagain", sameAs: true },
    { label: "Facebook", url: "https://www.facebook.com/sndp.com.np", sameAs: true },
  ] as SocialLink[],
  socialsTodo: todo(
    "Optional: Google Scholar or ORCID profile URLs once you start publishing research",
  ),

  /** Topics used for schema.org Person.knowsAbout. */
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Backend development",
    "Distributed systems",
    "REST APIs",
    "Microservices",
    "DevOps",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "GitHub Actions",
    "Redis",
    "Apache Kafka",
    "RabbitMQ",
    "MySQL",
    "Cloud infrastructure",
    "Flutter",
    "React",
    "System design",
    "Machine learning",
    "Natural language processing",
    "Nepali language processing",
  ],
} as const;

export type Degree = {
  id: string;
  name: string;
  abbreviation: string;
  field: string;
  /** Campus / college. */
  institution: Maybe<string>;
  /** Affiliated university, if the campus is part of one. */
  university?: string;
  institutionUrl?: Maybe<string>;
  /** Period of study, e.g. "2019 – 2024". */
  year: Maybe<string>;
  status: "Completed";
  description: string;
};

/** "Damak Multiple Campus, Tribhuvan University" */
export function institutionLabel(d: Degree): string | undefined {
  if (typeof d.institution !== "string") return undefined;
  return d.university ? `${d.institution}, ${d.university}` : d.institution;
}

export const education: Degree[] = [
  {
    id: "mit",
    name: "Master of Information Technology",
    abbreviation: "MIT",
    field: "Information Technology",
    institution: "Bhaktapur Multiple Campus",
    university: "Tribhuvan University",
    year: "2024 – 2026",
    status: "Completed",
    description:
      "Postgraduate study in information technology, building on the software development foundation from the BCA.",
  },
  {
    id: "bca",
    name: "Bachelor of Computer Applications",
    abbreviation: "BCA",
    field: "Computer Applications",
    institution: "Damak Multiple Campus",
    university: "Tribhuvan University",
    // The programme ran longer than the usual four years because of COVID-19 disruptions.
    year: "2019 – 2024",
    status: "Completed",
    description:
      "Undergraduate degree covering programming, data structures, databases, networking and software engineering.",
  },
];

export const company = {
  id: "a1-it-innovation",
  name: "A1 IT Innovation Pvt. Ltd.",
  shortName: "A1 IT Innovation",
  url: "https://a1itinnovation.com.np",
  country: "Nepal",
  countryCode: "NP",
  role: "Founder",
  foundingDate: todo("Year A1 IT Innovation was founded") as Maybe<string>,
  /** The company's own social profiles (Organization.sameAs — not Sandip's personal identity). */
  socials: [
    { label: "Facebook", url: "https://www.facebook.com/a1itinnovationnepal" },
    { label: "TikTok", url: "https://www.tiktok.com/@a1itinnovation" },
  ],
  description:
    "A1 IT Innovation Pvt. Ltd. is a software development and IT solutions company in Nepal, founded by Sandip Chapagain. Its team builds products and client projects, with Sandip contributing across backend development, DevOps and system design.",
  focusAreas: [
    { title: "Java & backend systems", body: "Server-side applications and APIs built with Java and Spring Boot." },
    { title: "Web applications", body: "Web front ends and dashboards, including React-based interfaces." },
    { title: "Mobile applications", body: "Cross-platform mobile apps, including Flutter." },
    { title: "DevOps & infrastructure", body: "Containerisation, CI/CD pipelines, and cloud/server infrastructure." },
    { title: "System design & architecture", body: "Designing how services, data stores and messaging fit together." },
    { title: "Technical consulting", body: "Advising on architecture, technology choices and delivery." },
    { title: "AI & automation", body: "Applying AI and automation where it solves a concrete problem." },
  ],
} as const;
