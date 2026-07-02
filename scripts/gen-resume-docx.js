// Generate an ATS-friendly resume DOCX for Kashyap Patel — recruiter-grade
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, BorderStyle, convertInchesToTwip,
} = require("docx");
const fs = require("fs");

const BLACK = "1A1A1A";
const MUTED = "444444";
const LINK = "1A56DB";

// ── Helpers ──
function link(url, text) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, size: 18, font: "Arial", color: LINK })],
  });
}

function linkSmall(url, text) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, size: 19, font: "Arial", color: LINK })],
  });
}

function mutedText(text) {
  return new TextRun({ text, size: 19, font: "Arial", color: MUTED });
}

function blackText(text, opts = {}) {
  return new TextRun({ text, size: 20, font: "Arial", color: BLACK, ...opts });
}

function boldBlack(text, opts = {}) {
  return new TextRun({ text, bold: true, size: 20, font: "Arial", color: BLACK, ...opts });
}

// ── Header ──
const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: "KASHYAP PATEL", bold: true, size: 40, font: "Arial", color: BLACK })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: "Full-Stack Developer & AI Engineer", size: 22, font: "Arial", color: MUTED })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      linkSmall("mailto:kashyappatel326@gmail.com", "kashyappatel326@gmail.com"),
      mutedText("  |  India  |  "),
      linkSmall("https://github.com/kashyap-p", "github.com/kashyap-p"),
      mutedText("  |  "),
      linkSmall("https://www.linkedin.com/in/kashyap-p", "linkedin.com/in/kashyap-p"),
      mutedText("  |  "),
      linkSmall("https://kashyap-p-portfolio.vercel.app", "Portfolio"),
    ],
  }),
];

function sectionHeader(title) {
  return [new Paragraph({
    spacing: { before: 120, after: 40 },
    border: { bottom: { color: BLACK, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 22, font: "Arial", color: BLACK })],
  })];
}

function bullet(runs) {
  return new Paragraph({
    spacing: { after: 20, line: 250 },
    indent: { left: 360, hanging: 200 },
    children: [
      new TextRun({ text: "\u2022  ", size: 20, font: "Arial", color: BLACK }),
      ...runs,
    ],
  });
}

function experienceBlock(title, org, dates, location, bullets) {
  const elements = [];
  elements.push(new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text: title, bold: true, size: 21, font: "Arial", color: BLACK })],
  }));
  elements.push(new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: `${org}  |  ${dates}  |  ${location}`, italics: true, size: 19, font: "Arial", color: MUTED })],
  }));
  for (const b of bullets) {
    elements.push(bullet([new TextRun({ text: b, size: 20, font: "Arial", color: BLACK })]));
  }
  elements.push(new Paragraph({ spacing: { after: 40 }, children: [] }));
  return elements;
}

function projectBlock(title, tech, repoUrl, repoDisplay, liveUrl, bulletText) {
  const elements = [];
  elements.push(new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: "Arial", color: BLACK }),
      new TextRun({ text: `  | ${tech}`, size: 18, font: "Arial", color: MUTED }),
    ],
  }));
  elements.push(new Paragraph({
    spacing: { after: 40 },
    children: [
      link(repoUrl, repoDisplay),
      new TextRun({ text: "  |  ", size: 19, font: "Arial", color: MUTED }),
      link(liveUrl, "Live Demo"),
    ],
  }));
  elements.push(bullet([new TextRun({ text: bulletText, size: 20, font: "Arial", color: BLACK })]));
  elements.push(new Paragraph({ spacing: { after: 40 }, children: [] }));
  return elements;
}

function skillLine(label, value) {
  return new Paragraph({
    spacing: { after: 30, line: 250 },
    children: [
      new TextRun({ text: `${label}:  `, bold: true, size: 20, font: "Arial", color: BLACK }),
      new TextRun({ text: value, size: 20, font: "Arial", color: BLACK }),
    ],
  });
}

// ── Build Children ──
const children = [...header];

// Summary
children.push(...sectionHeader("Professional Summary"));
children.push(new Paragraph({
  spacing: { after: 40, line: 250 },
  children: [blackText(
    "Full-Stack Developer and AI Engineer with 7+ years building production web applications and multi-agent " +
    "AI systems. Shipped 12+ public repositories spanning 3D interactive frontends (React, Three.js), " +
    "resilient backends (Node.js, MongoDB), and LangGraph-based AI copilots with RAG and computer vision. " +
    "Proven end-to-end delivery \u2014 from architecture to deployment on Vercel, Netlify, and Render."
  )],
}));

// Skills
children.push(...sectionHeader("Technical Skills"));
children.push(skillLine("Languages", "TypeScript, JavaScript, Python, SQL, HTML5, CSS3"));
children.push(skillLine("Frontend", "React 19, Next.js 16 (App Router), Three.js, React Three Fiber, Tailwind CSS 4, Framer Motion, shadcn/ui"));
children.push(skillLine("Backend", "Node.js, Express.js, REST API Design, WebSockets, Prisma ORM, Passport.js (JWT Auth)"));
children.push(skillLine("AI / ML", "LangGraph, Multi-Agent Orchestration, Retrieval-Augmented Generation (RAG), Vision-Language Models, LLM Integration, Fraud Detection"));
children.push(skillLine("Databases", "MongoDB, SQLite, PostgreSQL, Prisma"));
children.push(skillLine("Tools & DevOps", "Git, GitHub Actions, Docker, CI/CD, Vercel, Netlify, Render, Bun"));

// Experience
children.push(...sectionHeader("Experience"));
children.push(...experienceBlock(
  "AI Engineer & Multi-Agent Systems Developer", "Independent / Open Source",
  "2026 \u2014 Present", "India",
  [
    "Architected and shipped ClaimSight, a 9-agent LangGraph workflow automating insurance claims " +
    "adjudication with RAG, computer-vision damage assessment, and fraud detection \u2014 delivering cited, " +
    "traceable decisions that reduce manual review overhead.",
    "Integrated vision-language models to assess claim-photo damage severity and retrieve cited " +
    "policy-document evidence via retrieval-augmented generation (RAG), enabling explainable AI decisions.",
    "Engineered an interactive 3D portfolio with Next.js 16, React Three Fiber, and WebGL, achieving " +
    "smooth real-time rendering with mouse-parallax camera interaction.",
  ]
));
children.push(...experienceBlock(
  "Full-Stack Web Developer", "Independent",
  "2024 \u2014 2026", "India",
  [
    "Built and deployed Wanderlust, a full-stack MERN travel platform with JWT authentication, " +
    "geolocation maps, and Cloudinary image uploads \u2014 serving live traffic on Render.",
    "Developed a real-time weather dashboard (React, Vite) consuming the Open-Meteo API with a " +
    "glassmorphism UI, weather-reactive dynamic backgrounds, and Canvas-based particle effects.",
    "Implemented a live GitHub API integration with 10-minute caching and rate-limit-protected refresh, " +
    "auto-syncing 12+ repositories with zero manual maintenance.",
  ]
));
children.push(...experienceBlock(
  "Frontend Developer", "Independent",
  "2023 \u2014 2024", "India",
  [
    "Engineered a React task management app with priority-queued lists, status tracking, and persistent " +
    "state management \u2014 adopted as a daily personal productivity tool.",
    "Built 5+ responsive web applications (IMDB clone, alarm clock, tech-news, todo) in vanilla " +
    "JavaScript, mastering DOM manipulation, async data fetching, and mobile-first layouts.",
    "Deployed static sites via GitHub Pages with optimized assets, achieving sub-2-second load times " +
    "on mobile networks.",
  ]
));

// Key Projects
children.push(...sectionHeader("Key Projects"));
children.push(...projectBlock(
  "ClaimSight", "TypeScript, Next.js, LangGraph, RAG, Vision AI",
  "https://github.com/kashyap-p/claimsight", "github.com/kashyap-p/claimsight",
  "https://claimsight-steel.vercel.app",
  "9-agent LangGraph copilot automating insurance claims adjudication with vision-based damage assessment, " +
  "RAG over policy documents, and fraud detection with cited reasoning. Deployed on Vercel."
));
children.push(...projectBlock(
  "Weather Tracker", "React, Vite, Open-Meteo API, Canvas",
  "https://github.com/kashyap-p/weather-tracker", "github.com/kashyap-p/weather-tracker",
  "https://kashyap-p.github.io/weather-tracker",
  "Glassmorphism weather dashboard with weather-reactive dynamic backgrounds, city autocomplete search, " +
  "and ambient Canvas particle effects. Deployed on GitHub Pages."
));
children.push(...projectBlock(
  "Wanderlust", "Node.js, Express, MongoDB, EJS, Passport.js",
  "https://github.com/kashyap-p/Wanderlust---Nodejs-Project", "github.com/kashyap-p/Wanderlust",
  "https://wanderlust-nodejs-project.onrender.com/listings",
  "Full-stack MERN travel listings platform with CRUD operations, JWT authentication, map geolocation, " +
  "and image upload integration. Deployed on Render."
));

// ── Document ──
const doc = new Document({
  creator: "Kashyap Patel",
  title: "Resume - Kashyap Patel",
  description: "Full-Stack Developer Resume",
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 20 },
        paragraph: { spacing: { line: 250 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(0.5),
          bottom: convertInchesToTwip(0.5),
          left: convertInchesToTwip(0.5),
          right: convertInchesToTwip(0.5),
        },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  const outPath = "/home/z/my-project/Kashyap-Patel-Resume.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("DOCX generated: " + outPath);
});
