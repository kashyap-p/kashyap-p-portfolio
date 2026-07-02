// Centralized portfolio data sourced from github.com/kashyap-p (via GitHub API)

export const profile = {
  name: "Kashyap Patel",
  firstName: "Kashyap",
  role: "Full-Stack Developer",
  tagline: "Engineering robust, end-to-end web applications.",
  bio: "Full-Stack Developer with an engineering backbone. I apply structural logic and system optimization to build robust, end-to-end web applications — from pixel-perfect interfaces to resilient backends and AI-powered workflows.",
  location: "India",
  hireable: true,
  githubUsername: "kashyap-p",
  githubUrl: "https://github.com/kashyap-p",
  twitter: "Kashyap_0702",
  twitterUrl: "https://twitter.com/Kashyap_0702",
  avatarUrl: "https://avatars.githubusercontent.com/u/43714430?v=4",
  email: "kashyappatel326@gmail.com",
  // Live GitHub stats (snapshot from api.github.com)
  stats: {
    publicRepos: 12,
    followers: 1,
    yearsOnGithub: 7, // joined 2018
  },
};

export type Project = {
  name: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  descriptionLong: string;
  tags: string[];
  language: string;
  liveUrl?: string;
  repoUrl: string;
  featured: boolean;
  accent: "emerald" | "amber" | "pink" | "teal";
  highlights: string[];
  year: string;
};

// Curated "most useful" projects from github.com/kashyap-p
export const projects: Project[] = [
  {
    name: "claimsight",
    slug: "claimsight",
    title: "ClaimSight",
    tagline: "Multi-agent AI insurance claims copilot",
    description:
      "9-agent LangGraph-style workflow with RAG, vision assessment, fraud detection, and cited decisions.",
    descriptionLong:
      "A multi-modal, multi-agent insurance claims adjudication copilot. It orchestrates a 9-agent LangGraph-style workflow combining retrieval-augmented generation, computer-vision damage assessment, fraud detection, and traceable cited decisions to accelerate claim adjudication.",
    tags: [
      "AI Agents",
      "LangGraph",
      "RAG",
      "Vision",
      "Next.js",
      "TypeScript",
    ],
    language: "TypeScript",
    liveUrl: "https://claimsight-steel.vercel.app/",
    repoUrl: "https://github.com/kashyap-p/claimsight",
    featured: true,
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
    name: "weather-tracker",
    slug: "weather-tracker",
    title: "Weather Tracker",
    tagline: "Glassmorphism live weather dashboard",
    description:
      "Live weather dashboard with glassmorphism UI, dynamic backgrounds, city autocomplete, and particle effects.",
    descriptionLong:
      "A live weather dashboard featuring a glassmorphism UI, dynamic weather-reactive backgrounds, city autocomplete search, and ambient particle effects. Built with React + Vite on the free Open-Meteo API.",
    tags: ["React", "Vite", "Open-Meteo API", "Glassmorphism", "Canvas"],
    language: "JavaScript",
    liveUrl: "https://kashyap-p.github.io/weather-tracker/",
    repoUrl: "https://github.com/kashyap-p/weather-tracker",
    featured: true,
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
    name: "kashyap-portfolio",
    slug: "kashyap-portfolio",
    title: "Kashyap Portfolio",
    tagline: "Next.js 16 portfolio with live GitHub stats",
    description:
      "Personal portfolio website — Next.js 16, TypeScript, Tailwind CSS. Live GitHub stats with no third-party image dependencies.",
    descriptionLong:
      "A personal portfolio website built with Next.js 16, TypeScript and Tailwind CSS. It renders live GitHub stats with zero third-party image dependencies — every metric is fetched and rendered server-side.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Server Components"],
    language: "TypeScript",
    liveUrl: "https://kashyap-port-folio.vercel.app/",
    repoUrl: "https://github.com/kashyap-p/kashyap-portfolio",
    featured: true,
    accent: "amber",
    highlights: [
      "Next.js 16 App Router",
      "Live GitHub stats, no image deps",
      "TypeScript end-to-end",
      "Tailwind CSS design system",
    ],
    year: "2026",
  },
  {
    name: "portfolioNEW",
    slug: "portfolio-3d",
    title: "3D Portfolio",
    tagline: "React 18 + Three.js immersive portfolio",
    description:
      "3D portfolio website built with React 18, Three.js (React Three Fiber), and Vite.",
    descriptionLong:
      "An immersive 3D portfolio website built with React 18, Three.js via React Three Fiber, and Vite. Features real-time 3D scenes, animated geometry, and interactive camera work.",
    tags: ["React 18", "Three.js", "React Three Fiber", "Vite", "WebGL"],
    language: "JavaScript",
    liveUrl: "https://kashyap-p.github.io/portfolioNEW/",
    repoUrl: "https://github.com/kashyap-p/portfolioNEW",
    featured: true,
    accent: "pink",
    highlights: [
      "Real-time 3D scenes",
      "React Three Fiber",
      "Interactive camera work",
      "Vite build pipeline",
    ],
    year: "2026",
  },
  {
    name: "Wanderlust---Nodejs-Project",
    slug: "wanderlust",
    title: "Wanderlust",
    tagline: "Node.js + Express + MongoDB travel platform",
    description:
      "Wanderlust Project made using NodeJS, ExpressJS, MongoDB — a full-stack travel listings platform.",
    descriptionLong:
      "A full-stack travel listings platform built with Node.js, Express and MongoDB. Users can browse, create and review travel listings with authentication, map integration, and image uploads.",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Passport Auth"],
    language: "JavaScript",
    liveUrl: "https://wanderlust-nodejs-project.onrender.com/listings",
    repoUrl: "https://github.com/kashyap-p/Wanderlust---Nodejs-Project",
    featured: true,
    accent: "emerald",
    highlights: [
      "Full CRUD listings platform",
      "Authentication & authorization",
      "Map & image upload integration",
      "Deployed on Render",
    ],
    year: "2024",
  },
  {
    name: "React-task-management",
    slug: "task-management",
    title: "Task Management",
    tagline: "Priority-based React task manager",
    description:
      "React Task Management with Priority Lists — organize work by priority and status.",
    descriptionLong:
      "A React task management application with priority lists. Tasks can be organized, prioritized and tracked across statuses for focused, productive workflows.",
    tags: ["React", "State Management", "Productivity", "UI"],
    language: "JavaScript",
    repoUrl: "https://github.com/kashyap-p/React-task-management",
    featured: false,
    accent: "amber",
    highlights: [
      "Priority-based task lists",
      "Status tracking",
      "Clean React state management",
    ],
    year: "2024",
  },
  {
    name: "tech-news",
    slug: "tech-news",
    title: "Tech News",
    tagline: "Static tech-news demo site",
    description:
      "Static tech-news demo site built with plain HTML, CSS and JavaScript.",
    descriptionLong:
      "A static tech-news demo site built with plain HTML, CSS and JavaScript — a clean, responsive frontend showcasing layout and component composition fundamentals.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    language: "CSS",
    liveUrl: "https://kashyap-p.github.io/tech-news/",
    repoUrl: "https://github.com/kashyap-p/tech-news",
    featured: false,
    accent: "teal",
    highlights: [
      "Responsive layout",
      "Component composition",
      "Vanilla JS interactivity",
    ],
    year: "2026",
  },
  {
    name: "todo-app",
    slug: "todo-app",
    title: "Todo App",
    tagline: "Client-side todo list",
    description:
      "A small, client-side todo list app implemented with plain HTML, CSS and JavaScript.",
    descriptionLong:
      "A small, client-side todo list app implemented with plain HTML, CSS and JavaScript. Persisted in the browser, focused on clean UX and keyboard-friendly interaction.",
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    language: "CSS",
    liveUrl: "https://kashyap-p.github.io/todo-app/",
    repoUrl: "https://github.com/kashyap-p/todo-app",
    featured: false,
    accent: "pink",
    highlights: [
      "LocalStorage persistence",
      "Keyboard-friendly",
      "Minimal vanilla stack",
    ],
    year: "2026",
  },
];

export type Skill = {
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

export type TimelineItem = {
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
