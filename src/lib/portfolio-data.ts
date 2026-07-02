// Centralized portfolio data sourced from github.com/kashyap-p (via GitHub API)

export const profile = {
  name: "Kashyap Patel",
  firstName: "Kashyap",
  role: "Full-Stack Developer",
  bio: "Full-Stack Developer with an engineering backbone. I apply structural logic and system optimization to build robust, end-to-end web applications — from pixel-perfect interfaces to resilient backends and AI-powered workflows.",
  location: "India",
  hireable: true,
  githubUsername: "kashyap-p",
  githubUrl: "https://github.com/kashyap-p",
  linkedinUrl: "https://www.linkedin.com/in/kashyap-p",
  avatarUrl: "https://avatars.githubusercontent.com/u/43714430?v=4",
  email: "kashyappatel326@gmail.com",
  stats: {
    publicRepos: 12,
    followers: 1,
    yearsOnGithub: 7, // joined 2018
  },
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  accent: "emerald" | "amber" | "pink" | "teal";
  highlights: string[];
  year: string;
};

// Featured projects shown as cards in the Projects section (curated subset).
// The rest of the repos are fetched live via /api/github.
export const projects: Project[] = [
  {
    slug: "claimsight",
    title: "ClaimSight",
    tagline: "Multi-agent AI insurance claims copilot",
    description:
      "9-agent LangGraph-style workflow with RAG, vision assessment, fraud detection, and cited decisions.",
    tags: ["AI Agents", "LangGraph", "RAG", "Vision", "Next.js", "TypeScript"],
    liveUrl: "https://claimsight-steel.vercel.app/",
    repoUrl: "https://github.com/kashyap-p/claimsight",
    accent: "emerald",
    highlights: [
      "9 specialized agents in a coordinated workflow",
      "Vision-based damage assessment",
      "Fraud detection with cited reasoning",
      "RAG over policy documents",
    ],
    year: "2026",
  },
  {
    slug: "wanderlust",
    title: "Wanderlust",
    tagline: "Full-stack MERN travel listings platform",
    description:
      "Full-stack travel listings platform — Node.js, Express, MongoDB with JWT auth, geolocation maps, and image uploads.",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js"],
    liveUrl: "https://wanderlust-nodejs-project.onrender.com/listings",
    repoUrl: "https://github.com/kashyap-p/Wanderlust---Nodejs-Project",
    accent: "emerald",
    highlights: [
      "Full CRUD listings platform",
      "JWT authentication & authorization",
      "Map & image upload integration",
      "Deployed on Render",
    ],
    year: "2024",
  },
  {
    slug: "weather-tracker",
    title: "Weather Tracker",
    tagline: "Glassmorphism live weather dashboard",
    description:
      "Live weather dashboard with glassmorphism UI, dynamic backgrounds, city autocomplete, and particle effects.",
    tags: ["React", "Vite", "Open-Meteo API", "Glassmorphism", "Canvas"],
    liveUrl: "https://kashyap-p.github.io/weather-tracker/",
    repoUrl: "https://github.com/kashyap-p/weather-tracker",
    accent: "teal",
    highlights: [
      "Glassmorphism design system",
      "Weather-reactive dynamic backgrounds",
      "City autocomplete search",
      "Ambient particle effects",
    ],
    year: "2026",
  },
  {
    slug: "tech-news",
    title: "Tech News",
    tagline: "Static tech-news demo site",
    description:
      "Static tech-news demo site built with plain HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    liveUrl: "https://kashyap-p.github.io/tech-news/",
    repoUrl: "https://github.com/kashyap-p/tech-news",
    accent: "pink",
    highlights: [
      "Responsive layout",
      "Component composition",
      "Vanilla JS interactivity",
    ],
    year: "2026",
  },
];

type Skill = {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Backend" | "Language" | "Database" | "Tools & DevOps";
};

export const skills: Skill[] = [
  { name: "React / Next.js", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Language" },
  { name: "Three.js / R3F", level: 78, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Node.js / Express", level: 86, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "Prisma / SQL", level: 75, category: "Database" },
  { name: "Python", level: 72, category: "Language" },
  { name: "AI / LLM Agents", level: 84, category: "Backend" },
  { name: "REST & API Design", level: 85, category: "Backend" },
  { name: "Git / GitHub", level: 90, category: "Tools & DevOps" },
  { name: "Docker / CI", level: 68, category: "Tools & DevOps" },
];

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "2026 — Present",
    title: "AI Engineering & Multi-Agent Systems",
    org: "Independent / Open Source",
    description:
      "Designing multi-agent AI workflows with LangGraph-style orchestration — combining RAG, vision models and fraud detection into cited, traceable decisions (ClaimSight).",
    tags: ["LangGraph", "RAG", "Vision", "AI Agents"],
  },
  {
    period: "2024 — 2026",
    title: "Full-Stack Web Development",
    org: "Independent",
    description:
      "Shipped end-to-end web applications across the stack — Next.js 16 portfolios with live GitHub stats, glassmorphism weather dashboards, and Node.js + MongoDB platforms.",
    tags: ["Next.js", "Node.js", "MongoDB", "Three.js"],
  },
  {
    period: "2023 — 2024",
    title: "Frontend & React Foundations",
    org: "Independent",
    description:
      "Built task management apps, IMDB clone and alarm-clock utilities in React and vanilla JavaScript — cementing component architecture and state management.",
    tags: ["React", "JavaScript", "UI"],
  },
  {
    period: "2018",
    title: "Started on GitHub",
    org: "kashyap-p",
    description:
      "Began the open-source journey — 7 years and 12 public repositories later, still shipping.",
    tags: ["Open Source"],
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
