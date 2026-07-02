import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/lib/portfolio-data";

// In-memory cache to avoid hitting GitHub rate limits.
// GitHub unauthenticated rate limit is 60 req/hour per IP.
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

type CachedRepos = {
  data: PublicRepoSummary[];
  fetchedAt: number;
};

let cache: CachedRepos | null = null;

// Rate limit for forced refreshes (?refresh=true) to avoid exhausting
// GitHub's 60 req/hour unauthenticated limit. Allow max 5 forced refreshes
// per 5 minutes per IP.
const REFRESH_WINDOW_MS = 5 * 60 * 1000;
const REFRESH_MAX = 5;
const refreshHits = new Map<string, { count: number; first: number }>();

function refreshRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = refreshHits.get(ip);
  if (!entry || now - entry.first > REFRESH_WINDOW_MS) {
    refreshHits.set(ip, { count: 1, first: now });
    return false;
  }
  if (entry.count >= REFRESH_MAX) return true;
  entry.count += 1;
  return false;
}

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  visibility: string;
};

type PublicRepoSummary = {
  name: string;
  title: string;
  description: string;
  language: string | null;
  repoUrl: string;
  liveUrl?: string;
  year: string;
  stars: number;
  forks: number;
  updatedAt: string;
};

// The slugs of repos we already show as featured cards — excluded from the
// dynamic "Other repositories" list to avoid duplication.
const FEATURED_REPO_NAMES = new Set([
  "claimsight",
  "weather-tracker",
  "tech-news",
  "todo-app",
]);

function humanizeTitle(name: string): string {
  // Special-case known repo names for nicer display
  const overrides: Record<string, string> = {
    "Wanderlust---Nodejs-Project": "Wanderlust",
    "React-task-management": "Task Management",
    IMDB_CLONE: "IMDB Clone",
    "ALARM-CLOCK": "Alarm Clock",
    "kashyap-p": "GitHub Profile README",
    "kashyap-portfolio": "Kashyap Portfolio",
    portfolioNEW: "3D Portfolio",
    Portfolio: "Portfolio (legacy)",
  };
  if (overrides[name]) return overrides[name];

  return name
    .replace(/[-_]+/g, " ")
    .replace(/\bIMDB\b/i, "IMDB")
    .replace(/\bCLONE\b/i, "Clone")
    .replace(/\bALARM[-\s]?CLOCK\b/i, "Alarm Clock")
    .replace(/\bREADME\b/i, "README")
    .split(" ")
    .map((w) =>
      w.length <= 3 && w === w.toUpperCase()
        ? w
        : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ")
    .trim();
}

function buildSummary(repo: GithubRepo): PublicRepoSummary {
  const year = new Date(repo.created_at).getFullYear().toString();
  const homepage =
    repo.homepage && repo.homepage.trim().length > 0
      ? repo.homepage.trim()
      : undefined;
  return {
    name: repo.name,
    title: humanizeTitle(repo.name),
    description:
      repo.description?.trim() ||
      `Repository on github.com/${profile.githubUsername}.`,
    language: repo.language,
    repoUrl: repo.html_url,
    liveUrl: homepage,
    year,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
  };
}

export async function GET(req: NextRequest) {
  const now = Date.now();
  // ?refresh=true bypasses the cache and fetches fresh from GitHub.
  // Used by the "Refresh" button so visitors always get live data on demand.
  const forceRefresh = req.nextUrl.searchParams.get("refresh") === "true";

  // Rate-limit forced refreshes to protect the GitHub API budget.
  if (forceRefresh) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (refreshRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many refreshes. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }
  }

  // Serve from cache if fresh AND not a forced refresh
  if (!forceRefresh && cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(
      { ok: true, repos: cache.data, cached: true, fetchedAt: cache.fetchedAt },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "kashyap-portfolio",
        },
        // Always revalidate upstream on the server side
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // If we have stale cache, serve it as a fallback
      if (cache) {
        return NextResponse.json(
          {
            ok: true,
            repos: cache.data,
            cached: true,
            stale: true,
            fetchedAt: cache.fetchedAt,
            warning: `GitHub API returned ${res.status}; serving cached data.`,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          ok: false,
          error: `GitHub API responded with ${res.status}`,
        },
        { status: 502 }
      );
    }

    const all: GithubRepo[] = await res.json();

    // Filter + map to a clean summary list
    const summaries: PublicRepoSummary[] = all
      .filter((r) => !r.fork && !r.archived && r.visibility === "public")
      .filter((r) => !FEATURED_REPO_NAMES.has(r.name))
      .sort((a, b) => {
        // Recently updated first
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      })
      .map(buildSummary);

    cache = { data: summaries, fetchedAt: now };

    return NextResponse.json(
      { ok: true, repos: summaries, cached: false, fetchedAt: now },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  } catch (err) {
    console.error("[api/github] error", err);
    if (cache) {
      return NextResponse.json(
        {
          ok: true,
          repos: cache.data,
          cached: true,
          stale: true,
          fetchedAt: cache.fetchedAt,
          warning: "Failed to fetch fresh data; serving cached data.",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Failed to fetch repositories." },
      { status: 500 }
    );
  }
}
