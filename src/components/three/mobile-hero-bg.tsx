"use client";

/**
 * Lightweight CSS-only hero background for mobile devices.
 * Mimics the 3D scene's aesthetic with animated gradient orbs — no WebGL,
 * no JavaScript animation loop, renders instantly.
 */
export function MobileHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Central glowing orb (mimics the emerald core) */}
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #10b981 0%, #059669 35%, transparent 70%)",
        }}
      />
      {/* Amber accent orb */}
      <div
        className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full opacity-50 blur-2xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, transparent 80%)",
          animationDelay: "1.5s",
        }}
      />
      {/* Pink accent orb */}
      <div
        className="absolute bottom-1/4 left-1/4 h-28 w-28 rounded-full opacity-40 blur-2xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, #f472b6 0%, #db2777 50%, transparent 80%)",
          animationDelay: "0.8s",
        }}
      />
      {/* Teal accent orb */}
      <div
        className="absolute right-1/3 bottom-1/3 h-24 w-24 rounded-full opacity-40 blur-2xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, #2dd4bf 0%, #0d9488 50%, transparent 80%)",
          animationDelay: "2.2s",
        }}
      />
    </div>
  );
}
