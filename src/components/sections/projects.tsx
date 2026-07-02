"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { projects, type Project } from "@/lib/portfolio-data";
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

const filters = [
  { key: "all", label: "All Projects" },
  { key: "featured", label: "Featured" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function Projects() {
  const [filter, setFilter] = React.useState<FilterKey>("all");

  const visible = React.useMemo(() => {
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects;
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work & useful builds"
          description="A curated set of projects from github.com/kashyap-p — from multi-agent AI copilots to immersive 3D experiences and full-stack platforms."
        />

        {/* Filter */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1 backdrop-blur">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === f.key
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA to GitHub */}
        <div className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg" className="group">
            <a
              href="https://github.com/kashyap-p"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              See all 12 repositories on GitHub
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const a = accentMap[project.accent];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold ring-1",
                a.bg,
                a.text,
                a.border
              )}
            >
              {project.title.charAt(0)}
            </div>
            <div className="flex items-center gap-1.5">
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/20">
                  <Star className="h-3 w-3 fill-amber-300" /> Featured
                </span>
              )}
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-4 font-display text-xl font-bold">{project.title}</h3>
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
                <CheckCircle2 className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", a.text)} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
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
              <Button asChild size="sm" className={cn("flex-1", a.bg, a.text, a.border, "border hover:opacity-90")} variant="secondary">
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
