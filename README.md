# Kashyap Patel — 3D Portfolio

An interactive, animated 3D portfolio built with Next.js 16, React Three Fiber, Three.js, TypeScript, and Tailwind CSS.

Live demo: [kashyap-port-folio.vercel.app](https://kashyap-port-folio.vercel.app/)

## Features

- **3D animated hero** — distorted icosahedron core, orbiting shapes, particle sparkles, mouse-parallax camera (React Three Fiber + Three.js)
- **Dynamic GitHub sync** — the "Other repositories" list fetches live from the GitHub API, so new/deleted repos reflect automatically (10-minute cache + manual Refresh button)
- **Sections** — Hero, About (animated count-up stats), Skills (animated bars + tech marquee), Projects (4 featured tilt cards + dynamic repo list), Experience timeline, Contact form
- **Working contact form** — validated with zod, persisted to SQLite via Prisma, with a mailto fallback that delivers to `kashyappatel326@gmail.com`
- **Responsive** — mobile-first, sticky footer, dark/light theme toggle
- **Socials** — GitHub, LinkedIn, Twitter wired across navbar, hero, about, contact, footer

## Tech Stack

| Area        | Tech                                              |
| ----------- | ------------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19, TypeScript 5   |
| 3D          | Three.js, @react-three/fiber, @react-three/drei   |
| Styling     | Tailwind CSS 4, shadcn/ui (New York), tw-animate  |
| Animation   | Framer Motion                                     |
| Forms       | React Hook Form + Zod                             |
| Database    | Prisma ORM + SQLite (contact messages)            |
| Fonts       | Geist, Geist Mono, Space Grotesk                  |

## Getting Started

### Prerequisites

- Node.js 18+ (or [Bun](https://bun.sh))
- A GitHub account (repos are fetched live — no token needed for public repos)

### Install & Run

```bash
# Install dependencies
bun install   # or: npm install

# Set up the database (SQLite, local file)
cp .env.example .env
bun run db:push

# Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
bun run build
bun run start
```

## Project Structure

```
src/
├── app/                  # Next.js routes, layout, globals, favicon
│   ├── api/
│   │   ├── contact/      # POST contact form → SQLite + mailto fallback
│   │   └── github/       # GET live repos from GitHub API (cached)
│   ├── globals.css       # Theme tokens, utilities, animations
│   ├── icon.svg          # Custom emerald "K" favicon
│   ├── layout.tsx        # Root layout + fonts + ThemeProvider
│   └── page.tsx          # Single-page composition
├── components/
│   ├── layout/           # navbar, footer, theme-provider, theme-toggle
│   ├── sections/         # hero, about, skills, projects, experience, contact
│   ├── three/            # hero-scene (R3F canvas)
│   ├── shared/           # section-heading, tilt-card, count-up
│   └── ui/               # 8 shadcn primitives (badge, button, input, …)
├── hooks/                # use-scroll, use-toast
└── lib/                  # utils, db (Prisma client), portfolio-data
```

## Customization

All personal data (name, bio, email, socials, featured projects, skills, timeline) lives in [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts). Edit that file to make the portfolio your own.

## License

MIT — free to use as a template.
