"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { id: "home",       label: "Home",       short: "Home"  },
  { id: "summary",    label: "About",      short: "About" },
  { id: "skills",     label: "Skills",     short: "Skills"},
  { id: "projects",   label: "Projects",   short: "Work"  },
  { id: "experience", label: "Experience", short: "Exp"    },
  { id: "gallery",    label: "Gallery",    short: "Gallery" },
];

export default function FloatingNav() {
  const [active, setActive]   = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const light = theme === "light";

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current = "home";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= mid) current = item.id;
      }
      setActive(current);
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? light ? "rgba(244,244,245,0.85)" : "rgba(5,5,6,0.75)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? `1px solid ${light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)"}`
          : "1px solid transparent",
        boxShadow: scrolled
          ? light
            ? "0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.08)"
            : "0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 h-14 sm:h-[68px] flex items-center gap-3 sm:gap-4">

        {/* Left — status pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="hidden sm:block text-xs font-medium text-neutral-400 whitespace-nowrap">
            Open to Opportunities
          </span>
        </div>

        {/* Center — nav pill */}
        <div className="flex-1 min-w-0 flex justify-center overflow-hidden">
        <nav
          className="flex items-center gap-0.5 rounded-full px-1.5 py-1.5 overflow-x-auto no-scrollbar"
          style={{
            background: light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${light ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
            boxShadow: light
              ? "0 4px 20px rgba(0,0,0,0.08), inset 0 0.5px 0 rgba(0,0,0,0.06)"
              : "0 4px 20px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.12)",
          }}
        >
          {navItems.map(({ id, label, short }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="shrink-0 relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer text-[12px] sm:text-[13px] min-h-[36px] sm:min-h-[38px]"
              style={
                active === id
                  ? {
                      background: light ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
                      color: light ? "#f4f4f5" : "#0a0a0a",
                      boxShadow: light
                        ? "0 0 16px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.15)"
                        : "0 0 16px rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.3)",
                    }
                  : { color: "#737373" }
              }
              onMouseEnter={e => {
                if (active !== id) (e.currentTarget as HTMLElement).style.color = light ? "#0a0a0a" : "#e5e5e5";
              }}
              onMouseLeave={e => {
                if (active !== id) (e.currentTarget as HTMLElement).style.color = "#737373";
              }}
            >
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
        </div>

        {/* Right — theme toggle */}
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
