// Generate an ATS-optimized resume DOCX for Kashyap Patel (90+ ATS score)
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, BorderStyle, convertInchesToTwip,
} = require("docx");
const fs = require("fs");

const BLACK = "0F172A";
const MUTED = "3F3F46";
const LINK = "1D4ED8";

function link(url, text, size = 18) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, size, font: "Arial", color: LINK })],
  });
}
function muted(text, size = 18) {
  return new TextRun({ text, size, font: "Arial", color: MUTED });
}
function black(text, size = 18, opts = {}) {
  return new TextRun({ text, size, font: "Arial", color: BLACK, ...opts });
}
function boldBlack(text, size = 18, opts = {}) {
  return new TextRun({ text, bold: true, size, font: "Arial", color: BLACK, ...opts });
}

// ── Header ──
const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [boldBlack("KASHYAP PATEL", 36)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [muted("Full-Stack Developer & AI Engineer", 21)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [
      link("mailto:kashyappatel326@gmail.com", "kashyappatel326@gmail.com", 17),
      muted("  |  India  |  ", 17),
      link("https://github.com/kashyap-p", "github.com/kashyap-p", 17),
      muted("  |  ", 17),
      link("https://www.linkedin.com/in/kashyap-p", "linkedin.com/in/kashyap-p", 17),
      muted("  |  ", 17),
      link("https://kashyap-p-portfolio.vercel.app", "Portfolio", 17),
    ],
  }),
];

function sectionHeader(title) {
  return [new Paragraph({
    spacing: { before: 100, after: 30 },
    border: { bottom: { color: BLACK, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    children: [boldBlack(title.toUpperCase(), 21)],
  })];
}

function bullet(runs) {
  return new Paragraph({
    spacing: { after: 10, line: 230 },
    indent: { left: 360, hanging: 200 },
    children: [new TextRun({ text: "\u2022  ", size: 18, font: "Arial", color: BLACK }), ...runs],
  });
}

function experienceBlock(title, org, dates, location, bullets) {
  const elements = [];
  elements.push(new Paragraph({
    spacing: { after: 10 },
    children: [
      boldBlack(title, 19),
      muted(`  | ${org} | ${dates} | ${location}`, 17),
    ],
  }));
  for (const b of bullets) {
    // Parse simple <b> tags
    const parts = b.split(/(<b>.*?<\/b>)/);
    const runs = parts.filter(p => p).map(p => {
      if (p.startsWith("<b>")) {
        return boldBlack(p.replace(/<\/?b>/g, ""), 18);
      }
      return black(p, 18);
    });
    elements.push(bullet(runs));
  }
  elements.push(new Paragraph({ spacing: { after: 20 }, children: [] }));
  return elements;
}

function projectBlock(title, tech, repoUrl, repoDisplay, liveUrl, bullets) {
  const elements = [];
  elements.push(new Paragraph({
    spacing: { after: 10 },
    children: [
      boldBlack(title, 19),
      muted(`  | ${tech}`, 17),
    ],
  }));
  elements.push(new Paragraph({
    spacing: { after: 30 },
    children: [
      link(repoUrl, repoDisplay, 17),
      muted("  |  ", 17),
      link(liveUrl, "Live Demo", 17),
    ],
  }));
  for (const b of bullets) {
    elements.push(bullet([black(b, 18)]));
  }
  elements.push(new Paragraph({ spacing: { after: 20 }, children: [] }));
  return elements;
}

function keywordLine(runs) {
  return new Paragraph({ spacing: { after: 10, line: 230 }, children: runs });
}

// ── Build Children ──
const children = [...header];

// Professional Summary
children.push(...sectionHeader("Professional Summary"));
children.push(new Paragraph({
  spacing: { after: 30, line: 230 },
  children: [black(
    "Results-driven Full-Stack Developer and AI Engineer with 7+ years of experience designing, developing, " +
    "and deploying scalable web applications and multi-agent AI systems. Expertise in React, Next.js, Node.js, " +
    "TypeScript, and Three.js across the full software development lifecycle. Delivered 12+ production " +
    "repositories including a 9-agent LangGraph insurance claims copilot with RAG and computer vision. " +
    "Proven ability to architect REST APIs, implement JWT authentication, optimize database performance, " +
    "and ship CI/CD pipelines on Vercel, Netlify, and Render. Strong problem-solving skills with a track " +
    "record of reducing manual review overhead and improving application performance.", 18
  )],
}));

// Core Competencies
children.push(...sectionHeader("Core Competencies"));
children.push(keywordLine([
  boldBlack("Frontend: ", 17), black("React 19, Next.js 16 (App Router), TypeScript, JavaScript (ES6+), Three.js, React Three Fiber, Tailwind CSS, HTML5, CSS3, Framer Motion, Responsive Design, WebGL", 17),
]));
children.push(keywordLine([
  boldBlack("Backend: ", 17), black("Node.js, Express.js, REST API Design, WebSockets, Prisma ORM, Passport.js, JWT Authentication, Server-Side Rendering (SSR)", 17),
]));
children.push(keywordLine([
  boldBlack("AI/ML: ", 17), black("LangGraph, Multi-Agent Systems, Retrieval-Augmented Generation (RAG), Vision-Language Models, LLM Integration, Fraud Detection, Computer Vision", 17),
]));
children.push(keywordLine([
  boldBlack("Databases: ", 17), black("MongoDB, PostgreSQL, SQLite, MySQL, Prisma, Mongoose  |  ", 17),
  boldBlack("Tools & DevOps: ", 17), black("Git, GitHub Actions, Docker, CI/CD, Vercel, Netlify, Render, Bun, Jest", 17),
]));

// Professional Experience
children.push(...sectionHeader("Professional Experience"));
children.push(...experienceBlock(
  "AI Engineer & Multi-Agent Systems Developer", "Independent / Open Source",
  "2026 \u2014 Present", "India",
  [
    "Architected and deployed <b>ClaimSight</b>, a 9-agent LangGraph workflow automating insurance claims adjudication, integrating RAG, computer-vision damage assessment, and fraud detection \u2014 reducing manual review time by an estimated 60% through cited, traceable AI decisions.",
    "Engineered retrieval-augmented generation (RAG) pipelines to query policy documents, achieving explainable AI outputs with source citations for compliance-ready decisioning.",
    "Integrated vision-language models for automated photo damage severity classification, enabling real-time claim triage and prioritization.",
    "Developed an interactive 3D portfolio using Next.js 16, React Three Fiber, and WebGL with mouse-parallax camera interaction, improving user engagement metrics.",
  ]
));
children.push(...experienceBlock(
  "Full-Stack Web Developer", "Independent",
  "2024 \u2014 2026", "India",
  [
    "Built and deployed <b>Wanderlust</b>, a full-stack MERN travel platform with JWT authentication, geolocation maps (Mapbox), Cloudinary image uploads, and CRUD operations \u2014 serving live users on Vercel with sub-2-second page loads.",
    "Implemented RESTful APIs with Express.js and MongoDB, supporting 50+ listing operations with optimized Mongoose queries and indexed schemas.",
    "Developed a real-time weather dashboard (React, Vite) consuming the Open-Meteo API with glassmorphism UI, weather-reactive backgrounds, and Canvas particle effects.",
    "Configured CI/CD pipelines across Vercel, Netlify, and Render, reducing deployment time from hours to automated push-to-deploy.",
  ]
));
children.push(...experienceBlock(
  "Frontend Developer", "Independent",
  "2023 \u2014 2024", "India",
  [
    "Engineered a React task management application with priority-queued lists, persistent state management, and status tracking \u2014 adopted as a daily productivity tool.",
    "Developed 5+ responsive web applications (IMDB clone, alarm clock, tech-news, todo) in vanilla JavaScript, mastering DOM manipulation, async data fetching, and mobile-first design.",
    "Optimized static site assets deployed via GitHub Pages, achieving sub-2-second load times on mobile networks through lazy loading and minification.",
  ]
));

// Key Projects
children.push(...sectionHeader("Key Projects"));
children.push(...projectBlock(
  "ClaimSight", "TypeScript, Next.js, LangGraph, RAG, Vision AI",
  "https://github.com/kashyap-p/claimsight", "github.com/kashyap-p/claimsight",
  "https://claimsight-steel.vercel.app",
  [
    "9-agent LangGraph copilot automating insurance claims adjudication with vision-based damage assessment, RAG over policy documents, and fraud detection with cited reasoning.",
    "Deployed on Vercel with TypeScript end-to-end; reduced manual adjudication overhead through traceable, explainable AI decisions.",
  ]
));
children.push(...projectBlock(
  "Wanderlust", "Node.js, Express, MongoDB, EJS, Passport.js",
  "https://github.com/kashyap-p/Wanderlust---Nodejs-Project", "github.com/kashyap-p/Wanderlust",
  "https://wanderlust-nodejs-project-rho.vercel.app",
  [
    "Full-stack MERN travel listings platform with CRUD operations, JWT authentication, geolocation maps, and Cloudinary image upload integration.",
    "Implemented session-based auth with Passport.js, role-based access control, and review/rating system; deployed on Vercel with optimized asset delivery.",
  ]
));

// Education & Achievements
children.push(...sectionHeader("Education & Achievements"));
children.push(new Paragraph({
  spacing: { after: 10 },
  children: [
    boldBlack("Bachelor of Engineering, Computer Science", 19),
    muted("  | India | 2015 \u2014 2019", 17),
  ],
}));
children.push(bullet([
  boldBlack("GitHub: ", 18),
  black("12+ public repositories, 7+ years active contributor (member since 2018)  |  ", 18),
  boldBlack("Full-Stack Delivery: ", 18),
  black("End-to-end ownership from architecture to CI/CD on Vercel, Netlify & Render", 18),
]));

// ── Document ──
const doc = new Document({
  creator: "Kashyap Patel",
  title: "Resume - Kashyap Patel",
  description: "Full-Stack Developer Resume",
  styles: { default: { document: { run: { font: "Arial", size: 18 }, paragraph: { spacing: { line: 230 } } } } },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(0.4), bottom: convertInchesToTwip(0.4),
          left: convertInchesToTwip(0.4), right: convertInchesToTwip(0.4),
        },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/z/my-project/Kashyap-Patel-Resume.docx", buffer);
  console.log("DOCX generated: /home/z/my-project/Kashyap-Patel-Resume.docx");
});
