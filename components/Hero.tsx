"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Stagger helpers ── */
const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `hero-fade-up 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s both`,
});

function AnimatedWord({ word, startDelay, step = 0.045 }: { word: string; startDelay: number; step?: number }) {
  return (
    <>
      {word.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `hero-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${startDelay + i * step}s both`,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden pt-14 sm:pt-[68px]">

      {/* Main grid — flex-1 centers content in remaining viewport below header */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-10 md:px-14 pb-24 sm:pb-32 pt-10 sm:pt-12 lg:pt-8 items-center max-w-7xl mx-auto w-full">

        {/* ── Left: text ── */}
        <div className="flex flex-col gap-8 justify-center">

          {/* Role label */}
          <div className="flex items-center gap-3" style={fadeUp(0.15)}>
            <div className="h-px w-8 bg-neutral-600" />
            <span className="text-[11px] font-semibold tracking-[0.28em] text-neutral-500 uppercase">
              Developer
            </span>
          </div>

          {/* Name */}
          <div className="flex flex-col" style={{ gap: "0.04em" }}>
            <h1 className="text-[clamp(3rem,11vw,6.5rem)] font-black tracking-[-0.035em] leading-[0.93] text-neutral-900 dark:text-white">
              <AnimatedWord word="Ashley" startDelay={0.20} />
            </h1>
            <h1 className="text-[clamp(3rem,11vw,6.5rem)] font-black tracking-[-0.035em] leading-[0.93] text-neutral-900 dark:text-white">
              <AnimatedWord word="Nicole" startDelay={0.47} />
            </h1>
            <h1 className="text-[clamp(3rem,11vw,6.5rem)] font-black tracking-[-0.035em] leading-[0.93] text-neutral-900 dark:text-white">
              <AnimatedWord word="Gonzales" startDelay={0.74} />
            </h1>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-4" style={fadeUp(0.58)}>
            <div className="h-px max-w-[64px] flex-1 bg-gradient-to-r from-neutral-700 to-transparent" />
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
            Translating logic into seamless digital experiences.
            </p>
          </div>

          {/* Contact pills */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2" style={fadeUp(0.70)}>
            <ContactPill href="mailto:ash@laungayan.com"         label="ash@laungayan.com"       icon="✉" />
            <ContactPill href="https://github.com/itzmeashleyG"  label="github.com/itzmeashleyG" icon="⌥" external />
            <ContactPill href="tel:09765198717"                  label="09765198717"              icon="↗" />
            <ContactPill href="#"                                label="Taguig City, PH"         icon="◎" />
          </div>
        </div>

        {/* ── Right: photo ── */}
        <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last">
          <div
            className="lg:-translate-x-16"
            style={{ animation: "hero-photo-in 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s both" }}
          >
            <PhotoCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Contact pill ── */
function ContactPill({ href, label, icon, external }: {
  href: string; label: string; icon: string; external?: boolean;
}) {
  const { theme } = useTheme();
  const light  = theme === "light";
  const bg     = light ? "rgba(0,0,0,0.05)"  : "rgba(255,255,255,0.04)";
  const border = light ? "rgba(0,0,0,0.09)"  : "rgba(255,255,255,0.07)";
  const bgHov  = light ? "rgba(0,0,0,0.08)"  : "rgba(255,255,255,0.09)";
  const borHov = light ? "rgba(0,0,0,0.15)"  : "rgba(255,255,255,0.15)";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-2.5 rounded-xl px-4 py-3 overflow-hidden"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = bgHov;
        el.style.borderColor = borHov;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = bg;
        el.style.borderColor = border;
      }}
    >
      <span className="text-xs text-neutral-500 dark:text-neutral-600 shrink-0 select-none">{icon}</span>
      <span
        className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate font-medium"
        style={{ transition: "color 0.3s ease" }}
      >
        {label}
      </span>
    </a>
  );
}

/* ── Photo card with animated border + theme animation ── */
function PhotoCard() {
  const [hovered, setHovered]     = useState(false);
  const [shutter, setShutter]     = useState(false);
  const { theme }                 = useTheme();
  const light                     = theme === "light";
  const prevTheme                 = useRef(theme);

  /* Trigger shutter flash whenever theme changes */
  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;
    setShutter(true);
    const t = setTimeout(() => setShutter(false), 700);
    return () => clearTimeout(t);
  }, [theme]);

  /* ── Derived transforms ── */
  const cardTransform = (() => {
    const lift  = hovered ? "translateY(-14px) scale(1.025)" : "translateY(0) scale(1)";
    const angle = light   ? " rotateY(5deg) rotateX(-2deg)"  : "";
    return lift + angle;
  })();

  const imgTransform = (() => {
    const zoom = hovered ? 1.10 : light ? 1.07 : 1.0;
    const rot  = light ? "rotate(-1.5deg)" : "rotate(0deg)";
    return `scale(${zoom}) ${rot}`;
  })();

  const imgPosition  = light ? "40% 45%"  : "center 90%";
  const imgFilter    = light
    ? "contrast(1.02) brightness(1.12) saturate(0.8)"
    : "contrast(1.08) brightness(0.88) saturate(0.82)";
  const glowColor   = light
    ? "rgba(0,0,0,0.18)"
    : "rgba(255,255,255,0.14)";
  const shadowColor = light
    ? "rgba(0,0,0,0.12)"
    : "rgba(255,255,255,0.06)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{ width: "min(360px, 78vw)", aspectRatio: "3 / 4", perspective: "1000px" }}
    >
      {/* Ambient glow — colour shifts with theme */}
      <div
        className="absolute -inset-10 rounded-[48px] -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 68%)`,
          filter: "blur(36px)",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.6s ease, background 1.2s ease",
        }}
      />

      {/* Card wrapper */}
      <div className="relative w-full h-full">
        {/* Card — hover lift + theme angle */}
        <div
          className="relative w-full h-full"
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            transform: cardTransform,
            transition: "transform 1.1s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.8s ease",
            boxShadow: hovered
              ? `0 28px 64px rgba(0,0,0,0.55), 0 0 48px ${shadowColor.replace("0.1","0.18")}`
              : `0 14px 44px rgba(0,0,0,0.38), 0 0 24px ${shadowColor}`,
          }}
        >
          {/* Border layer 1 — slow spin */}
          <div className="absolute pointer-events-none" style={{
            inset: "-120%",
            background: "conic-gradient(from 0deg, rgba(255,255,255,0.03) 0deg, rgba(255,255,255,0.55) 55deg, rgba(200,200,200,0.38) 95deg, rgba(255,255,255,0.28) 135deg, rgba(180,180,180,0.08) 175deg, rgba(255,255,255,0.16) 240deg, rgba(255,255,255,0.03) 360deg)",
            animation: "photo-border-spin 8s linear infinite",
          }}/>


          {/* Photo container */}
          <div className="absolute overflow-hidden" style={{ inset: "1.5px", borderRadius: "22px", background: "#050506" }}>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nicole.jpg"
              alt="Ashley Nicole Gonzales"
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                objectPosition: imgPosition,
                filter: imgFilter,
                transform: imgTransform,
                transition: "transform 1.3s cubic-bezier(0.34,1.1,0.64,1), filter 1.1s ease, object-position 1.3s cubic-bezier(0.34,1.1,0.64,1)",
              }}
            />

            {/* Film grain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay" style={{ opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
              <filter id="photo-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#photo-grain)"/>
            </svg>

            {/* Warm light leak — fades in light mode */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 85% 10%, rgba(255,255,255,0.07) 0%, transparent 55%)",
              opacity: light ? 0.4 : 1,
              transition: "opacity 1.2s ease",
            }}/>

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
              height: "42%",
              background: light
                ? "linear-gradient(to top, rgba(240,235,225,0.55) 0%, rgba(240,235,225,0.2) 55%, transparent 100%)"
                : "linear-gradient(to top, rgba(5,5,6,0.94) 0%, rgba(5,5,6,0.42) 55%, transparent 100%)",
              transition: "background 1.2s ease",
            }}/>

            {/* ── Camera shutter flash on theme change ── */}
            {shutter && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ animation: "photo-shutter 0.65s ease-out forwards", background: light ? "#fff" : "#fff" }}
              />
            )}

            {/* Hover shimmer */}
            {hovered && (
              <div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
                style={{ animation: "shimmer-slide 1s ease-out forwards" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
