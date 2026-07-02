"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Server,
  Layout,
  Brain,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CountUp } from "@/components/shared/count-up";
import { profile } from "@/lib/portfolio-data";

const whatIDo = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Crafting pixel-perfect, accessible interfaces with React, Next.js, Tailwind and Three.js.",
    color: "text-emerald-400",
    ring: "ring-emerald-400/30",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Designing resilient Node.js/Express services, REST APIs and databases with Prisma & MongoDB.",
    color: "text-amber-400",
    ring: "ring-amber-400/30",
    bg: "bg-amber-400/10",
  },
  {
    icon: Brain,
    title: "AI & Multi-Agent Systems",
    description:
      "Building LangGraph-style agent workflows with RAG, vision and cited, traceable reasoning.",
    color: "text-pink-400",
    ring: "ring-pink-400/30",
    bg: "bg-pink-400/10",
  },
];

const stats = [
  { value: profile.stats.publicRepos, label: "Public Repos", suffix: "" },
  { value: profile.stats.yearsOnGithub, label: "Years on GitHub", suffix: "+" },
  { value: 9, label: "Agent Workflows", suffix: "" },
  { value: 100, label: "Commitment", suffix: "%" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Engineering robust, end-to-end products"
          description="I bring structural logic and system optimization to every layer of the stack — from immersive 3D interfaces to resilient backends and AI workflows."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Avatar + identity card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute -inset-3 animate-spin rounded-full bg-gradient-to-tr from-primary via-accent to-pink-400 opacity-70 blur-md [animation-duration:8s]" />
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background">
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.name} avatar`}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-200" />
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold">
                  {profile.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-primary">
                  @{profile.githubUsername}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-card/60 px-2.5 py-1">
                    <MapPin className="h-3 w-3" /> {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-card/60 px-2.5 py-1">
                    <Briefcase className="h-3 w-3" />{" "}
                    {profile.hireable ? "Open to work" : "Busy"}
                  </span>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio + what I do */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {whatIDo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition-colors hover:border-primary/40"
                >
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color} ring-1 ${item.ring}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-card/40 p-4 text-center backdrop-blur"
                >
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
