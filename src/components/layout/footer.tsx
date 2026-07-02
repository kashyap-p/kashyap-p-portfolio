"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUp, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              {profile.name}
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {profile.role} building robust, end-to-end web applications &amp;
              AI workflows.
            </p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-[1.05rem] w-[1.05rem]" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-[1.05rem] w-[1.05rem]" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Let&apos;s connect
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Open to opportunities, collaborations and interesting problems.
            </p>
            <Button asChild className="mt-4 glow-emerald" size="sm">
              <a href="#contact">Start a conversation</a>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with
            <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
            using Next.js, Three.js &amp; Tailwind.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
