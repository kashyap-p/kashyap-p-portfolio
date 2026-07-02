"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { timeline } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="The journey so far"
          description="From vanilla JavaScript fundamentals to multi-agent AI systems — a continuous arc of building."
        />

        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-primary via-accent/60 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-primary" />
                    </span>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-10 w-full sm:ml-0 sm:w-1/2 ${
                      isLeft ? "sm:pr-12" : "sm:pl-12"
                    }`}
                  >
                    <div className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition-colors hover:border-primary/40">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary">
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.period}
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        {item.org}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
