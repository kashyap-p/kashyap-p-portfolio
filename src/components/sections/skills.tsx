"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const categories = [
  "Frontend",
  "Backend",
  "Language",
  "Database",
  "Tools & DevOps",
] as const;

const categoryMeta: Record<
  string,
  { color: string; bar: string; ring: string }
> = {
  Frontend: { color: "text-emerald-400", bar: "from-emerald-500 to-teal-400", ring: "ring-emerald-400/30" },
  Backend: { color: "text-amber-400", bar: "from-amber-500 to-orange-400", ring: "ring-amber-400/30" },
  Language: { color: "text-pink-400", bar: "from-pink-500 to-rose-400", ring: "ring-pink-400/30" },
  Database: { color: "text-teal-400", bar: "from-teal-500 to-cyan-400", ring: "ring-teal-400/30" },
  "Tools & DevOps": { color: "text-violet-400", bar: "from-violet-500 to-fuchsia-400", ring: "ring-violet-400/30" },
};

const marqueeTech = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Prisma",
  "Python",
  "LangGraph",
  "RAG",
  "Docker",
  "Git",
  "REST APIs",
  "React Three Fiber",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A versatile, full-stack toolkit"
          description="From immersive 3D frontends to resilient backends and AI agent orchestration — here's the stack I reach for."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, ci) => {
            const meta = categoryMeta[cat];
            const items = skills.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <span
                    className={cn(
                      "inline-flex h-2.5 w-2.5 rounded-full bg-current ring-2",
                      meta.color,
                      meta.ring
                    )}
                  />
                  {cat}
                </h3>

                <div className="mt-5 space-y-4">
                  {items.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 1,
                            delay: 0.15 + i * 0.08,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            meta.bar
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-16 flex overflow-hidden border-y border-border/40 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-3 pr-3">
          {[...marqueeTech, ...marqueeTech].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
