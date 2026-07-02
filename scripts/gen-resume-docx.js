// Generate an ATS-friendly resume DOCX for Kashyap Patel
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, TabStopType, TabStopPosition,
  LevelFormat, convertInchesToTwip,
} = require("docx");
const fs = require("fs");

// ── Helpers ──
const BLACK = "1A1A1A";
const MUTED = "555555";

function nameParagraph() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "KASHYAP PATEL", bold: true, size: 44, font: "Arial", color: BLACK }),
    ],
  });
}

function roleParagraph() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({ text: "Full-Stack Developer", size: 24, font: "Arial", color: MUTED }),
    ],
  });
}

function contactParagraph() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: "kashyappatel326@gmail.com  |  India  |  github.com/kashyap-p  |  linkedin.com/in/kashyap-p",
        size: 19, font: "Arial", color: MUTED,
      }),
    ],
  });
}

function sectionHeader(title) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 60 },
      border: { bottom: { color: BLACK, space: 1, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({ text: title.toUpperCase(), bold: true, size: 24, font: "Arial", color: BLACK }),
      ],
    }),
  ];
}

function bodyParagraph(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 60, line: 276 },
    children: [
      new TextRun({ text, size: 20, font: "Arial", color: BLACK, ...opts }),
    ],
  });
}

function bulletParagraph(runs) {
  return new Paragraph({
    spacing: { after: 40, line: 276 },
    indent: { left: 360, hanging: 200 },
    children: [
      new TextRun({ text: "\u2022  ", size: 20, font: "Arial", color: BLACK }),
      ...runs,
    ],
  });
}

function experienceBlock(title, org, dates, location, bullets) {
  const elements = [];
  // Title line
  elements.push(new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: "Arial", color: BLACK }),
    ],
  }));
  // Meta line: org | dates | location
  elements.push(new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${org}  |  ${dates}  |  ${location}`, italics: true, size: 19, font: "Arial", color: MUTED }),
    ],
  }));
  // Bullets
  for (const b of bullets) {
    elements.push(bulletParagraph([
      new TextRun({ text: b, size: 20, font: "Arial", color: BLACK }),
    ]));
  }
  elements.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  return elements;
}

function projectBlock(title, tech, url, bullets) {
  const elements = [];
  elements.push(new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: "Arial", color: BLACK }),
      new TextRun({ text: `  | ${tech}`, size: 18, font: "Arial", color: MUTED }),
    ],
  }));
  elements.push(new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: url, italics: true, size: 19, font: "Arial", color: MUTED }),
    ],
  }));
  for (const b of bullets) {
    elements.push(bulletParagraph([
      new TextRun({ text: b, size: 20, font: "Arial", color: BLACK }),
    ]));
  }
  elements.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
  return elements;
}

function skillLine(label, value) {
  return new Paragraph({
    spacing: { after: 50, line: 276 },
    children: [
      new TextRun({ text: `${label}:  `, bold: true, size: 20, font: "Arial", color: BLACK }),
      new TextRun({ text: value, size: 20, font: "Arial", color: BLACK }),
    ],
  });
}

// ── Build Document ──
const children = [];

// Header
children.push(nameParagraph());
children.push(roleParagraph());
children.push(contactParagraph());

// Professional Summary
children.push(...sectionHeader("Professional Summary"));
children.push(bodyParagraph(
  "Full-Stack Developer with an engineering backbone, specializing in robust, end-to-end web " +
  "applications and AI-powered workflows. 7+ years building on GitHub across the full stack \u2014 " +
  "from pixel-perfect 3D interfaces (React, Three.js) to resilient backends (Node.js, Express, " +
  "MongoDB) and multi-agent AI systems (LangGraph, RAG, vision models). Applied structural logic " +
  "and system optimization to ship 12+ public repositories, including a 9-agent insurance claims " +
  "adjudication copilot."
));

// Technical Skills
children.push(...sectionHeader("Technical Skills"));
children.push(skillLine("Languages", "TypeScript, JavaScript, Python, SQL"));
children.push(skillLine("Frontend", "React, Next.js (16), Three.js, React Three Fiber, Tailwind CSS, HTML5, CSS3"));
children.push(skillLine("Backend", "Node.js, Express, REST API Design, Prisma ORM, Passport.js"));
children.push(skillLine("AI / ML", "LangGraph, Multi-Agent Workflows, RAG, Vision Models, LLM Integration, Fraud Detection"));
children.push(skillLine("Databases", "MongoDB, SQLite, PostgreSQL, Prisma"));
children.push(skillLine("Tools & DevOps", "Git, GitHub, Docker, CI/CD, Vercel, Netlify, Render"));

// Experience
children.push(...sectionHeader("Experience"));
children.push(...experienceBlock(
  "AI Engineer & Multi-Agent Systems Developer", "Independent / Open Source",
  "2026 \u2014 Present", "India",
  [
    "Designed and built ClaimSight, a multi-modal multi-agent insurance claims adjudication copilot " +
    "orchestrating a 9-agent LangGraph-style workflow with RAG, computer-vision damage assessment, " +
    "fraud detection, and traceable cited decisions.",
    "Integrated vision-language models for automated damage assessment and policy-document retrieval " +
    "using retrieval-augmented generation (RAG).",
    "Built an interactive 3D portfolio website using Next.js 16, React Three Fiber, and Three.js with " +
    "real-time WebGL rendering and mouse-parallax camera interaction.",
  ]
));
children.push(...experienceBlock(
  "Full-Stack Web Developer", "Independent",
  "2024 \u2014 2026", "India",
  [
    "Developed and deployed Wanderlust, a full-stack travel listings platform using Node.js, Express, " +
    "and MongoDB with authentication, map integration, and image uploads (deployed on Render).",
    "Built a live weather dashboard with glassmorphism UI, dynamic weather-reactive backgrounds, city " +
    "autocomplete, and particle effects using React, Vite, and the Open-Meteo API.",
    "Implemented dynamic GitHub API integration for auto-syncing repository lists with 10-minute " +
    "caching and rate-limit-protected refresh.",
  ]
));
children.push(...experienceBlock(
  "Frontend Developer", "Independent",
  "2023 \u2014 2024", "India",
  [
    "Built a React task management application with priority-based task lists and status tracking.",
    "Developed vanilla JavaScript projects including an IMDB clone and alarm clock utility, cementing " +
    "component architecture and DOM manipulation fundamentals.",
    "Created responsive static sites (tech-news, todo app) with HTML, CSS, and JavaScript deployed via " +
    "GitHub Pages.",
  ]
));

// Key Projects
children.push(...sectionHeader("Key Projects"));
children.push(...projectBlock(
  "ClaimSight", "TypeScript, Next.js, LangGraph, RAG, Vision AI",
  "github.com/kashyap-p/claimsight  |  Live: claimsight-steel.vercel.app",
  [
    "Multi-agent AI copilot with 9 specialized agents in a coordinated LangGraph workflow for " +
    "insurance claims adjudication with cited, traceable decisions.",
  ]
));
children.push(...projectBlock(
  "Weather Tracker", "React, Vite, Open-Meteo API, Canvas",
  "github.com/kashyap-p/weather-tracker  |  Live: kashyap-p.github.io/weather-tracker",
  [
    "Glassmorphism weather dashboard with dynamic backgrounds, city autocomplete, and ambient " +
    "particle effects.",
  ]
));
children.push(...projectBlock(
  "Wanderlust", "Node.js, Express, MongoDB, EJS, Passport.js",
  "github.com/kashyap-p/Wanderlust---Nodejs-Project  |  Live: wanderlust-nodejs-project.onrender.com",
  [
    "Full-stack travel listings platform with CRUD operations, authentication, map and image upload " +
    "integration.",
  ]
));

// GitHub & Online Presence
children.push(...sectionHeader("GitHub & Online Presence"));
children.push(new Paragraph({
  spacing: { after: 50, line: 276 },
  children: [
    new TextRun({ text: "GitHub: ", bold: true, size: 20, font: "Arial", color: BLACK }),
    new TextRun({ text: "github.com/kashyap-p \u2014 12 public repositories, 7+ years active (member since 2018)", size: 20, font: "Arial", color: BLACK }),
    new TextRun({ text: "    LinkedIn: ", bold: true, size: 20, font: "Arial", color: BLACK }),
    new TextRun({ text: "linkedin.com/in/kashyap-p", size: 20, font: "Arial", color: BLACK }),
  ],
}));

// ── Create Document ──
const doc = new Document({
  creator: "Kashyap Patel",
  title: "Resume - Kashyap Patel",
  description: "Full-Stack Developer Resume",
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 20 },
        paragraph: { spacing: { line: 276 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(0.6),
          bottom: convertInchesToTwip(0.6),
          left: convertInchesToTwip(0.6),
          right: convertInchesToTwip(0.6),
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
