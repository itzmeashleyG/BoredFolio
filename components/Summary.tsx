"use client";

import { useRef, useState, useCallback } from "react";
import RevealWord from "./RevealWord";
import { useTheme } from "@/contexts/ThemeContext";

export default function Summary() {
  const softSkills = [
    "Adaptability & Fast Learning",
    "Team Collaboration",
    "Time Management",
  ];

  return (
    <div className="flex flex-col gap-14">
      {/* Top row: photo + bio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Photo */}
        <div className="flex justify-center md:justify-start">
          <SummaryPhoto / >
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 uppercase">
            01 — Summary
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-neutral-900 dark:text-white leading-tight">
            <RevealWord text="Better is the goal" className="block" />
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
            Highly motivated and inspired graduating student with a Diploma in
            Application Development. Passionate about becoming a developer who
            creates impactful, user-centric web and mobile applications. Driven
            by a love for problem-solving and eager to contribute to innovative
            development projects.
          </p>
        </div>
      </div>

      {/* Bottom row: soft skills + languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Soft skills */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em] mb-4">
            Soft Skills
          </h3>
          <div className="flex flex-col gap-2">
            {softSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.06] rounded-xl px-4 py-3.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em] mb-4">
            Languages
          </h3>
          <div className="flex flex-col gap-5">
            <LangBar lang="Filipino" level={6} max={6} />
            <LangBar lang="English" level={4} max={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Animated photo card ─── */
function SummaryPhoto() {
  const { theme } = useTheme();
  const light = theme === "light";
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const [rot, setRot]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const nx = (e.clientX - left) / width  - 0.5;
      const ny = (e.clientY - top)  / height - 0.5;
      setRot({ x: ny * -12, y: nx * 12 });
    });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRot({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] aspect-[4/5] cursor-default"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 rounded-[48px] -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "float-glow 4s ease-in-out infinite",
          opacity: hovered ? 0.9 : 0.35,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Decorative ring — offset behind */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
        style={{
          transform: `translate(10px, 10px) rotateX(${rot.x * 0.4}deg) rotateY(${rot.y * 0.4}deg)`,
          transition: hovered
            ? "transform 0.1s linear"
            : "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px",
        }}
      />

      {/* Tilting card */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: hovered
            ? "transform 0.08s linear, box-shadow 0.4s ease"
            : "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease",
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.14)"
            : "0 16px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-[#0a0a0a]" />

        {/* Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wow.jpg"
          alt="Ashley Nicole Gonzales"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            filter: "none",
            transform: hovered ? "scale(1.06)" : "scale(1.0)",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />

        {/* Specular highlight that tracks the tilt */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${50 + rot.y * 2.5}% ${50 + rot.x * 2.5}%,
              rgba(255,255,255,0.1) 0%,
              transparent 58%
            )`,
            transition: hovered ? "background 0.08s linear" : "background 0.7s ease",
          }}
        />

        {/* Shimmer on hover */}
        {hovered && (
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
            style={{ animation: "shimmer-slide 1s ease-out forwards" }}
          />
        )}

        {/* Bottom gradient + name tag */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background: light
              ? "linear-gradient(to top, rgba(244,244,245,0.92) 0%, rgba(244,244,245,0.4) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 55%, transparent 100%)",
            transition: "background 0.4s ease",
          }}
        />

        
      </div>
    </div>
  );
}

/* ─── Language bar ─── */
function LangBar({ lang, level, max }: { lang: string; level: number; max: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-neutral-700 dark:text-neutral-300 w-20 shrink-0">{lang}</span>
      <div className="flex gap-1.5 flex-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < level ? "bg-neutral-900 dark:bg-white" : "bg-black/10 dark:bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
