import { todo, type Maybe } from "@/lib/todo";

/**
 * Project case studies. Each entry becomes /projects/[slug].
 *
 * To add a project: append an object to `projects`. Any section you cannot
 * fill yet should be `todo("...")` — never invent results or metrics.
 */

export type ArchitectureBlock = {
  title: string;
  body: string;
  technologies: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** One line shown on cards. */
  tagline: string;
  /** 1–2 sentence factual summary; also used as meta description. */
  summary: string;
  /** How Sandip is related to the project — stated precisely. */
  relationship: string;
  role: string;
  /** Entity that Sandip's contribution was made through, if any. */
  via?: { name: string; url: string };
  url: Maybe<string>;
  period: Maybe<string>;
  status: "Active" | "In development" | "Completed" | "Archived";
  category: "Product" | "Company" | "Open source" | "Research";
  technologies: string[];
  features?: string[];
  featured?: boolean;
  /** schema.org SoftwareApplication.applicationCategory, for product projects. */
  applicationCategory?: string;
  sections: {
    problem: Maybe<string[]>;
    solution: Maybe<string[]>;
    architecture: Maybe<ArchitectureBlock[]>;
    contribution: Maybe<string[]>;
    challenges: Maybe<string[]>;
    results: Maybe<string[]>;
    lessons: Maybe<string[]>;
  };
  /** Blog posts (slugs) that discuss this project. */
  relatedPosts?: string[];
};

export const projects: Project[] = [
  {
    slug: "tufan-ride",
    name: "Tufan Ride",
    tagline: "Ride-sharing platform for Nepal",
    summary:
      "Tufan Ride is a Nepal-based ride-sharing platform with rider and passenger apps, location services, payments and real-time communication. Sandip Chapagain contributes to its engineering through A1 IT Innovation.",
    relationship:
      "Sandip Chapagain's work on Tufan Ride is a technical contribution made through A1 IT Innovation Pvt. Ltd.",
    role: "Engineering contribution via A1 IT Innovation",
    via: { name: "A1 IT Innovation Pvt. Ltd.", url: "https://a1itinnovation.com.np" },
    url: todo("Official Tufan Ride website or app store link"),
    period: todo("When your work on Tufan Ride started (and ended, if applicable)"),
    status: "Active",
    category: "Product",
    applicationCategory: "TravelApplication",
    featured: true,
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "MySQL",
      "Redis",
      "Apache Kafka",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "Firebase",
      "Geolocation",
      "Payment integrations",
      "Real-time communication",
      "DevOps",
    ],
    features: [
      "Rider and passenger applications",
      "Ride requests",
      "Location services",
      "Payments and wallets",
      "User verification",
      "Real-time communication between riders and passengers",
    ],
    sections: {
      problem: [
        "A ride-sharing service has to connect people who need a ride with riders who are nearby, quickly and reliably. That means tracking locations as they change, handling ride requests as they happen, moving money safely, and making sure the people on both sides are verified.",
        "Tufan Ride brings this to Nepal, which means building for local conditions, local payment methods and local users.",
      ],
      solution: [
        "The platform is made up of rider and passenger functionality supported by a backend that handles location services, ride requests, payments, wallets, verification and real-time communication.",
        "The backend is built with Java and Spring Boot and exposes REST APIs to the client applications. It runs in containers, with Docker and Kubernetes used as part of the deployment and infrastructure.",
      ],
      architecture: [
        {
          title: "Backend services",
          body: "Java and Spring Boot services expose REST APIs used by the rider and passenger applications.",
          technologies: ["Java", "Spring Boot", "REST APIs"],
        },
        {
          title: "Data and caching",
          body: "MySQL is used for persistent data, with Redis in the stack for fast in-memory data access.",
          technologies: ["MySQL", "Redis"],
        },
        {
          title: "Messaging",
          body: "Kafka and RabbitMQ are part of the system for asynchronous messaging between components.",
          technologies: ["Apache Kafka", "RabbitMQ"],
        },
        {
          title: "Location and real-time",
          body: "Geolocation services and real-time communication support ride requests and live updates between riders and passengers. Firebase is part of the stack.",
          technologies: ["Geolocation", "Real-time communication", "Firebase"],
        },
        {
          title: "Payments",
          body: "Payment integrations and wallet functionality handle in-app transactions.",
          technologies: ["Payment integrations", "Wallets"],
        },
        {
          title: "Infrastructure",
          body: "Services are containerised with Docker and run on Kubernetes, supported by DevOps practices and server infrastructure.",
          technologies: ["Docker", "Kubernetes", "DevOps"],
        },
      ],
      contribution: todo(
        "Describe exactly which parts you built or led (e.g. which services, the payment integration, infrastructure setup, CI/CD). Be specific — this is the most important section for your portfolio.",
      ),
      challenges: todo(
        "2–4 real technical challenges you faced (e.g. keeping location data fresh, payment callback reliability, message ordering) and how you solved them.",
      ),
      results: todo(
        "Only verifiable outcomes you are comfortable publishing (launch date, cities, performance improvements). Leave empty if unsure.",
      ),
      lessons: todo("What you learned building a ride-sharing system that you would carry into the next project."),
    },
  },
  {
    slug: "a1-it-innovation",
    name: "A1 IT Innovation Pvt. Ltd.",
    tagline: "Software development and IT solutions company, Nepal",
    summary:
      "A1 IT Innovation Pvt. Ltd. is a software development and IT solutions company in Nepal founded by Sandip Chapagain. It works on backend systems, web and mobile applications, DevOps and cloud infrastructure.",
    relationship: "Founder",
    role: "Founder",
    url: "https://a1itinnovation.com.np",
    period: todo("Founding year, e.g. '2023 – present'"),
    status: "Active",
    category: "Company",
    featured: true,
    technologies: [
      "Java",
      "Spring Boot",
      "Flutter",
      "React",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "MySQL",
      "Redis",
    ],
    sections: {
      problem: [
        "Businesses need software that is built properly and kept running: backend systems that hold up under real use, applications people can actually use, and infrastructure that can be deployed and maintained without heroics.",
      ],
      solution: [
        "A1 IT Innovation provides software development and IT solutions, covering Java and backend development, web and mobile applications, DevOps, cloud and server infrastructure, system design, software architecture, technical consulting, and AI and automation.",
      ],
      architecture: todo(
        "Optional: describe the company's standard engineering setup (e.g. common stack, CI/CD approach, deployment platform).",
      ),
      contribution: [
        "Founded the company and works on its software engineering.",
      ],
      challenges: todo("Optional: engineering or organisational challenges of building the company."),
      results: todo("Optional: publicly shareable outcomes (projects delivered, products launched). Do not include client names without permission."),
      lessons: todo("Optional: lessons from running a software company in Nepal."),
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
