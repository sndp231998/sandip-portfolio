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

  /**
   * Only verified profiles belong here. Add GitHub, LinkedIn, Google Scholar,
   * ORCID, etc. once you provide the exact URLs.
   */
  socials: [] as SocialLink[],
  socialsTodo: todo(
    "Provide exact URLs for GitHub, LinkedIn, Google Scholar, ORCID or any other profile you want linked (these become schema.org sameAs)",
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
  institution: Maybe<string>;
  institutionUrl?: Maybe<string>;
  year: Maybe<string>;
  status: "Completed";
  description: string;
};

export const education: Degree[] = [
  {
    id: "mit",
    name: "Master of Information Technology",
    abbreviation: "MIT",
    field: "Information Technology",
    institution: todo("University / college name for your MIT"),
    year: todo("MIT completion year"),
    status: "Completed",
    description:
      "Postgraduate study in information technology, building on the software development foundation from the BCA.",
  },
  {
    id: "bca",
    name: "Bachelor of Computer Applications",
    abbreviation: "BCA",
    field: "Computer Applications",
    institution: todo("University / college name for your BCA"),
    year: todo("BCA completion year"),
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
  description:
    "A1 IT Innovation Pvt. Ltd. is a software development and IT solutions company in Nepal, founded by Sandip Chapagain.",
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
