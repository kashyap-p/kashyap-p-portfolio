"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, otherRepos, type Project } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const accentMap: Record<
  Project["accent"],
  {
    text: string;
    bg: string;
    border: string;
    glow: string;
    chip: string;
    dot: string;
    grad: string;
  }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    glow: "group-hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.5)]",
    chip: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    dot: "bg-emerald-400",
    grad: "from-emerald-500/20 via-emerald-400/5 to-transparent",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    glow: "group-hover:shadow-[0_20px_60px_-20px_rgba(245,158,11,0.5)]",
    chip: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
    dot: "bg-amber-400",
    grad: "from-amber-500/20 via-amber-400/5 to-transparent",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/30",
    glow: "group-hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.5)]",
    chip: "bg-pink-400/10 text-pink-300 ring-pink-400/20",
    dot: "bg-pink-400",
    grad: "from-pink-500/20 via-pink-400/5 to-transparent",
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    glow: "group-hover:shadow-[0_20px_60px_-20px_rgba(20,184,166,0.5)]",
    chip: "bg-teal-400/10 text-teal-300 ring-teal-400/20",
    dot: "bg-teal-400",
    grad: "from-teal-500/20 via-teal-400/5 to-transparent",
  },
};

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work & useful builds"
          description="A curated set of projects from github.com/kashyap-p — from multi-agent AI copilots to glassmorphism dashboards and clean frontend builds."
        />

        {/* Featured project cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* More on GitHub */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <Github className="h-3.5 w-3.5" />
                More on GitHub
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                Other repositories
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                The rest of my open-source work — full-stack platforms, legacy
                builds and small utilities. All live on{" "}
                <a
                  href="https://github.com/kashyap-p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  github.com/kashyap-p
                </a>
                .
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <a
                href="https://github.com/kashyap-p"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View all repos
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {otherRepos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Github className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate font-display text-base font-semibold">
                      {repo.title}
                    </h4>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="font-mono">{repo.year}</span>
                    {repo.liveUrl && (
                      <span className="inline-flex items-center gap-1 text-primary">
                        <ExternalLink className="h-3 w-3" />
                        Live demo
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const a = accentMap[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <TiltCard
        maxTilt={8}
        className={cn(
          "h-full rounded-2xl border bg-card/50 p-6 backdrop-blur transition-shadow duration-300",
          a.border,
          a.glow
        )}
      >
        <div
          className="flex h-full flex-col"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl font-display text-xl font-bold ring-1",
                a.bg,
                a.text,
                a.border
              )}
            >
              {project.title.charAt(0)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/20">
                <Star className="h-3 w-3 fill-amber-300" /> Featured
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-4 font-display text-2xl font-bold">
            {project.title}
          </h3>
          <p className={cn("mt-0.5 text-sm font-medium", a.text)}>
            {project.tagline}
          </p>

          {/* Description */}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="mt-4 space-y-1.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2
                  className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", a.text)}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "rounded-full border bg-transparent px-2.5 py-0.5 text-[0.7rem] font-medium",
                  a.chip
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-4">
            {project.liveUrl ? (
              <Button
                asChild
                size="sm"
                className={cn(
                  "flex-1 border",
                  a.bg,
                  a.text,
                  a.border,
                  "hover:opacity-90"
                )}
                variant="secondary"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
                </a>
              </Button>
            ) : (
              <span className="flex-1 text-center text-xs text-muted-foreground">
                Demo coming soon
              </span>
            )}
            <Button asChild size="sm" variant="outline">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
