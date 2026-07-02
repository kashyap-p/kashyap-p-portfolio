"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Sparkles,
  Code2,
  Boxes,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-data";

// Load the 3D canvas only on the client
const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-40 w-40 animate-pulse rounded-full bg-primary/20 blur-2xl" />
      </div>
    ),
  }
);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Aurora background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-500/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      {/* 3D scene — receives pointer events for mouse-parallax */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Content — pass-through so pointer events reach the 3D canvas,
          except interactive elements which opt back in */}
      <div className="pointer-events-none mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Available for work
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient animate-gradient-pan">
              {profile.name}
            </span>
            <br />
            <span className="text-foreground/90">{profile.role}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            variants={item}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
          >
            <Button asChild size="lg" className="group glow-emerald">
              <a href="#projects">
                <Boxes className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                View My Work
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 bg-card/40 backdrop-blur"
            >
              <a href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <span className="flex items-center gap-1">
              <Button asChild size="icon" variant="ghost" className="h-10 w-10 sm:h-11 sm:w-11">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="icon" variant="ghost" className="h-10 w-10 sm:h-11 sm:w-11">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </span>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {profile.stats.publicRepos}
                </span>{" "}
                public repos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {profile.stats.yearsOnGithub}+
                </span>{" "}
                years building
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Boxes className="h-4 w-4 text-pink-400" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">Full-stack</span>{" "}
                &amp; AI
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Spacer for 3D on large screens */}
        <div className="hidden lg:col-span-5 lg:block" />
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
