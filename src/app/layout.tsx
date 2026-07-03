import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kashyap-p-portfolio.vercel.app"),
  title: "Kashyap Patel — Full-Stack Developer | 3D Portfolio",
  description:
    "Kashyap Patel is a full-stack developer building robust, end-to-end web applications. Explore an interactive 3D portfolio of projects, skills, and experience.",
  keywords: [
    "Kashyap Patel",
    "Full-Stack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Three.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: "Kashyap Patel" }],
  openGraph: {
    title: "Kashyap Patel — Full-Stack Developer",
    description:
      "Interactive 3D portfolio of Kashyap Patel, full-stack developer.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
