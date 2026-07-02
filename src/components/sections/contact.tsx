"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof schema>;

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "text-emerald-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${profile.githubUsername}`,
    href: profile.githubUrl,
    color: "text-amber-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/kashyap-p",
    href: profile.linkedinUrl,
    color: "text-sky-400",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: `@${profile.twitter}`,
    href: profile.twitterUrl,
    color: "text-pink-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
    color: "text-teal-400",
  },
];

type SuccessState = {
  name: string;
  recipient: string;
  mailto: string;
} | null;

export function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [success, setSuccess] = React.useState<SuccessState>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent! 🎉",
        description: `Thanks ${values.name.split(" ")[0]}, your message has been delivered.`,
      });
      setSubmitted(true);
      setSuccess({
        name: values.name.split(" ")[0],
        recipient: data.recipient || profile.email,
        mailto: data.mailto,
      });
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      toast({
        title: "Couldn't send message",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Have a project, role, or idea in mind? Drop me a message — I read every one and reply fast."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new opportunities
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold">
                Get in touch
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Whether it&apos;s a full-stack build, an AI workflow, or a 3D
                experience — I&apos;d love to hear about it.
              </p>

              <div className="mt-8 space-y-3">
                {contactItems.map((item) => {
                  const Inner = (
                    <div className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl bg-card/60 ring-1 ring-border/60",
                          item.color
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="truncate font-medium">{item.value}</div>
                      </div>
                      {item.href && (
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div key={item.label}>{Inner}</div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Avg. response time: within 24 hours
              </div>
            </div>
          </motion.div>

          {/* Form / Success */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </motion.div>

                  <h3 className="mt-5 font-display text-2xl font-bold">
                    Message delivered, {success.name}! 🎉
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out. Your message has been saved and a
                    copy is on its way to{" "}
                    <span className="font-mono text-emerald-400">
                      {success.recipient}
                    </span>
                    . I&apos;ll reply within 24 hours.
                  </p>

                  <div className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Prefer to send it from your own inbox?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tap below to open your email client with the message
                      pre-filled.
                    </p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <Button asChild className="glow-emerald">
                        <a href={success.mailto}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send via Email
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSuccess(null)}
                      >
                        Send another message
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Your name" error={errors.name?.message} required>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      {...register("name")}
                      className="bg-background/60"
                    />
                  </Field>
                  <Field
                    label="Email address"
                    error={errors.email?.message}
                    required
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      autoComplete="email"
                      {...register("email")}
                      className="bg-background/60"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Subject" error={errors.subject?.message}>
                    <Input
                      id="subject"
                      placeholder="Project inquiry / collaboration / hiring"
                      {...register("subject")}
                      className="bg-background/60"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field
                    label="Message"
                    error={errors.message?.message}
                    required
                  >
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your project, timeline, and how I can help…"
                      {...register("message")}
                      className="resize-none bg-background/60"
                    />
                  </Field>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                  Messages are delivered to{" "}
                  <span className="font-mono text-foreground">
                    {profile.email}
                  </span>
                </div>

                <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    By sending, you agree to be contacted about your message.
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="glow-emerald w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={label} className="mb-1.5 flex items-center gap-1 text-sm font-medium">
        {label}
        {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
