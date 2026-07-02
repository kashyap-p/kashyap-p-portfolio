# Kashyap Patel — 3D Portfolio

An interactive, animated 3D portfolio built with **Next.js 16**, **React Three Fiber**, **Three.js**, **TypeScript**, and **Tailwind CSS**.

Live demo: [kashyap-port-folio.vercel.app](https://kashyap-port-folio.vercel.app/)

---

## Features

- **3D animated hero** — distorted icosahedron core, orbiting shapes, particle sparkles, mouse-parallax camera (React Three Fiber + Three.js)
- **Dynamic GitHub sync** — the "Other repositories" list fetches live from the GitHub API, so new/deleted repos reflect automatically (10-minute cache + manual Refresh button)
- **Sections** — Hero, About (animated count-up stats), Skills (animated bars + tech marquee), Projects (4 featured tilt cards + dynamic repo list), Experience timeline, Contact form
- **Working contact form** — validated with Zod, persisted to SQLite via Prisma, with a `mailto:` fallback that delivers to `kashyappatel326@gmail.com`
- **Responsive** — mobile-first, sticky footer, dark/light theme toggle
- **Socials** — GitHub, LinkedIn, Twitter wired across navbar, hero, about, contact, footer

---

## Tech Stack

| Area        | Tech                                              |
| ----------- | ------------------------------------------------- |
| Runtime     | Node.js 18.18+ (or Bun 1.1+)                      |
| Framework   | Next.js 16 (App Router), React 19, TypeScript 5   |
| 3D          | Three.js, @react-three/fiber, @react-three/drei   |
| Styling     | Tailwind CSS 4, shadcn/ui (New York), tw-animate  |
| Animation   | Framer Motion                                     |
| Forms       | React Hook Form + Zod                             |
| Database    | Prisma ORM + SQLite (contact messages)            |
| Fonts       | Geist, Geist Mono, Space Grotesk                  |

---

## Prerequisites

This is a Node.js project. You need **Node.js 18.18 or newer** (Node 20 LTS or 22 LTS recommended) and a package manager.

### 1. Install Node.js

Pick whichever option fits your setup:

**Option A — Official installer (Windows / macOS)**

Download the LTS installer from <https://nodejs.org> and run it.

**Option B — nvm (macOS / Linux)**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install the latest LTS Node.js
nvm install --lts
nvm use --lts
```

**Option C — fnm (fast, cross-platform)**

```bash
# Install fnm (macOS via Homebrew)
brew install fnm

# Or via cargo / winget / scoop — see https://github.com/Schniz/fnm
# Then add the shell setup, and:
fnm install --lts
fnm use lts-latest
```

**Option D — Bun (alternative runtime, fastest)**

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Verify the installation

```bash
node --version    # should print v18.18.0 or higher
npm --version     # should print 10+ (ships with Node)
```

> **Node version note:** Next.js 16 requires Node.js 18.18+, but Node 20 LTS or 22 LTS is recommended for the best performance and long-term support. If you hit `ERR_MODULE_NOT_FOUND` or engine warnings, upgrade with `nvm install --lts && nvm use --lts`.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kashyap-p/kashyap-portfolio.git
cd kashyap-portfolio
```

### 2. Install dependencies

Use **any one** of these package managers (they all work):

```bash
# npm (ships with Node.js)
npm install

# or pnpm (faster, disk-efficient)
npm install -g pnpm && pnpm install

# or yarn
npm install -g yarn && yarn install

# or Bun (fastest)
bun install
```

### 3. Set up the environment

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

The default `DATABASE_URL` points to a local SQLite file — no external database needed.

### 4. Initialize the database

Push the Prisma schema to create the SQLite database and the `ContactMessage` table:

```bash
npm run db:push      # or: bun run db:push / pnpm db:push / yarn db:push
```

This creates `db/custom.db` (gitignored) on first run.

### 5. Start the development server

```bash
npm run dev          # or: bun run dev / pnpm dev / yarn dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser. The site hot-reloads on file changes.

---

## Available Scripts

| Script              | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start the dev server on port 3000 with hot reload      |
| `npm run build`     | Create an optimized production build in `.next/`       |
| `npm run start`     | Start the production server (run `build` first)        |
| `npm run lint`      | Run ESLint (Next.js + TypeScript rules)                |
| `npm run db:push`   | Push the Prisma schema to the local SQLite database    |
| `npm run db:generate` | Regenerate the Prisma Client after schema changes    |

---

## Build for Production

```bash
# 1. Build the optimized bundle
npm run build

# 2. Start the production server
npm run start
```

The production server runs on port 3000 by default. Set `PORT=8080 npm run start` to change it.

### Deploy to Vercel (recommended)

This is a standard Next.js app — deploy in one click:

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. After deploy, run `npm run db:push` locally anytime you change the schema (the SQLite DB is local-only; for a persistent DB on Vercel, swap the `DATABASE_URL` to a hosted Postgres/MySQL and update `prisma/schema.prisma` accordingly).

---

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

---

## Customization

All personal data — name, bio, email, socials, featured projects, skills, timeline — lives in [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts). Edit that one file to make the portfolio your own.

Common tweaks:

| What you want to change        | File                                              |
| ------------------------------ | ------------------------------------------------- |
| Name, bio, email, socials      | `src/lib/portfolio-data.ts` → `profile`           |
| Featured project cards         | `src/lib/portfolio-data.ts` → `projects`          |
| Skills + levels                | `src/lib/portfolio-data.ts` → `skills`            |
| Experience timeline            | `src/lib/portfolio-data.ts` → `timeline`          |
| Colors (dark / light theme)    | `src/app/globals.css` → `:root` and `.dark`       |
| 3D hero scene                  | `src/components/three/hero-scene.tsx`             |
| Favicon                        | `src/app/icon.svg`                                |

---

## Troubleshooting

<details>
<summary><strong>Node version errors / engine warnings</strong></summary>

Next.js 16 needs Node 18.18+. Check your version:

```bash
node --version
```

If it's older, upgrade with nvm:

```bash
nvm install --lts
nvm use --lts
nvm alias default lts/*   # make it the default
```

Then remove `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><strong>Prisma: "Database not found" / first-run schema error</strong></summary>

Run the database setup before starting the dev server:

```bash
npm run db:push
```

This creates `db/custom.db` and syncs the schema. If you change `prisma/schema.prisma`, run `db:push` again, then `npm run db:generate` to refresh the client.

</details>

<details>
<summary><strong>3D scene doesn't render (blank hero)</strong></summary>

- The 3D hero uses WebGL — make sure hardware acceleration is enabled in your browser.
- The scene loads client-side only (`ssr: false`), so it appears after hydration. A brief loading blur is normal.
- If you're on a headless/CI environment without a GPU, the canvas will be empty — this is expected.

</details>

<details>
<summary><strong>GitHub repos don't load in "Other repositories"</strong></summary>

The `/api/github` route fetches from the GitHub API. GitHub's unauthenticated rate limit is **60 requests/hour per IP**. If you exceed it:

- Wait an hour for the limit to reset, or
- Click the **Refresh** button (top-right of the "Other repositories" section) — it forces a fresh fetch.

The route caches results for 10 minutes, so normal browsing won't hit the limit.

</details>

<details>
<summary><strong>Port 3000 already in use</strong></summary>

```bash
# Find and kill the process using port 3000
lsof -i :3000          # macOS / Linux
netstat -ano | findstr :3000   # Windows

# Or start on a different port
npx next dev -p 3001
```

</details>

<details>
<summary><strong>"module not found" after switching package managers</strong></summary>

Different package managers create incompatible lockfiles. Pick one and stick with it. To switch cleanly:

```bash
rm -rf node_modules package-lock.json bun.lock yarn.lock pnpm-lock.yaml
npm install   # or your preferred manager
```

</details>

---

## License

MIT — free to use as a template. See [LICENSE](LICENSE).
