/**
 * Skills grouped by what they are used for, not as a flat keyword list.
 * No proficiency ratings — the projects and articles are the evidence.
 */

export type SkillGroup = {
  id: string;
  title: string;
  body: string;
  technologies: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend engineering",
    body: "Most of my work is on the server side. I build services in Java with Spring Boot, design REST APIs for web and mobile clients, and model data in MySQL.",
    technologies: ["Java", "Spring Boot", "REST APIs", "MySQL"],
  },
  {
    id: "distributed",
    title: "Distributed systems & messaging",
    body: "When one service is no longer enough, the hard part is how the pieces communicate. I work with microservice architectures, Redis for fast in-memory data, and Kafka and RabbitMQ for asynchronous messaging between components.",
    technologies: ["Microservices", "Redis", "Apache Kafka", "RabbitMQ"],
  },
  {
    id: "devops",
    title: "DevOps & infrastructure",
    body: "I also handle deployment and operations: packaging services with Docker, running them on Kubernetes, automating builds and deployments with GitHub Actions, and managing cloud and server infrastructure.",
    technologies: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Cloud / server infrastructure"],
  },
  {
    id: "apps",
    title: "Web & mobile applications",
    body: "Backends need clients. I build cross-platform mobile applications with Flutter and web interfaces with React, so I can work across the whole product.",
    technologies: ["Flutter", "React"],
  },
  {
    id: "design",
    title: "System design",
    body: "I think about how services, databases, caches and message brokers fit together, and about the trade-offs between consistency, latency and operational complexity.",
    technologies: ["System design", "Software architecture"],
  },
  {
    id: "ai",
    title: "AI & ML experimentation",
    body: "I experiment with AI and machine learning, particularly language models, multilingual embeddings and Nepali language processing. See the research page for what I am interested in.",
    technologies: ["LLMs", "Embeddings", "NLP"],
  },
];
