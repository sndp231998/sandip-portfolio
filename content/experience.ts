import { todo, type Maybe } from "@/lib/todo";

/** Work history. Only confirmed roles belong here. */

export type Role = {
  title: string;
  organization: string;
  organizationUrl?: string;
  period: Maybe<string>;
  location: string;
  summary: string;
  highlights: Maybe<string[]>;
  technologies: string[];
  projectSlugs?: string[];
};

export const experience: Role[] = [
  {
    title: "Founder",
    organization: "A1 IT Innovation Pvt. Ltd.",
    organizationUrl: "https://a1itinnovation.com.np",
    period: todo("Start year, e.g. '2023 – present'"),
    location: "Nepal",
    summary:
      "Founded A1 IT Innovation, a software development and IT solutions company. Works on backend systems, application development, DevOps and infrastructure.",
    highlights: [
      "Engineering contribution to Tufan Ride, a Nepal-based ride-sharing platform, through A1 IT Innovation.",
    ],
    technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "MySQL", "Redis", "Kafka", "RabbitMQ", "Flutter", "React"],
    projectSlugs: ["a1-it-innovation", "tufan-ride"],
  },
];

export const experienceTodo = todo(
  "Add any earlier roles (title, organisation, dates, 2–3 factual highlights). Leave out anything you do not want public.",
);
