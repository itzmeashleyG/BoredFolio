"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import RevealWord from "./RevealWord";
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPhp,
  SiMysql,
  SiFirebase,
  SiGit,
  SiFigma,
  SiLaravel,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

interface Tech {
  name: string;
  icon: IconType;
  color: string;
  category: string;
}

const techStack: Tech[] = [
  { name: "React.js",    icon: SiReact,       color: "#61DAFB", category: "Front-End" },
  { name: "HTML5",       icon: SiHtml5,       color: "#E34F26", category: "Front-End" },
  { name: "CSS3",        icon: SiCss,         color: "#1572B6", category: "Front-End" },
  { name: "JavaScript",  icon: SiJavascript,  color: "#F7DF1E", category: "Front-End" },
  { name: "Tailwind CSS",icon: SiTailwindcss, color: "#06B6D4", category: "Front-End" },
  { name: "PHP",         icon: SiPhp,         color: "#777BB4", category: "Back-End"  },
  { name: "Laravel",     icon: SiLaravel,     color: "#FF2D20", category: "Back-End"  },
  { name: "Java",        icon: FaJava,        color: "#5382A1", category: "Back-End"  },
  { name: "MySQL / SQL", icon: SiMysql,       color: "#4479A1", category: "Database"  },
  { name: "Firebase",    icon: SiFirebase,    color: "#FFCA28", category: "Database"  },
  { name: "Figma",       icon: SiFigma,       color: "#F24E1E", category: "Design"    },
  { name: "Git",         icon: SiGit,         color: "#F05032", category: "Tools"     },
  { name: "GitHub",      icon: SiGithub,      color: "#e2e2e2", category: "Tools"     },
];

const categories = ["Front-End", "Back-End", "Database", "Design", "Tools"];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          container.querySelectorAll<HTMLElement>("[data-tech]").forEach((el, i) => {
            el.style.animation = `stagger-in 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.045}s both`;
          });
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 uppercase mb-4">
        02 — Technical Skills
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-neutral-900 dark:text-white mb-10 sm:mb-14 leading-tight">
        <RevealWord text="Tools of the" className="block" />
        <RevealWord text="trade." className="block text-neutral-400 dark:text-neutral-600" delay={0.26} />
      </h2>

      <div ref={containerRef} className="flex flex-col gap-10">
        {categories.map((cat) => {
          const items = techStack.filter((t) => t.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-neutral-400 dark:text-neutral-700 uppercase tracking-[0.2em] mb-4">
                {cat}
              </h3>
              <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {items.map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TechCard({ tech }: { tech: Tech }) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const light = theme === "light";
  const Icon = tech.icon;

  return (
    <div
      data-tech
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3 rounded-2xl p-4 sm:p-5 cursor-default relative overflow-hidden"
      style={{
        background: hovered
          ? `radial-gradient(ellipse at 50% 80%, ${tech.color}18 0%, ${light ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.06)"} 60%)`
          : light ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid ${tech.color}66`
          : light ? "1px solid rgba(0,0,0,0.13)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? `0 8px 30px ${tech.color}28, 0 0 0 1px ${tech.color}22, inset 0 1px 0 ${tech.color}20`
          : "none",
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.3,0.64,1), background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Icon
        className="w-8 h-8 relative z-10 shrink-0"
        style={{
          color: tech.color,
          transform: hovered ? "scale(1.28)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 10px ${tech.color}cc)` : "none",
          transition:
            "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
        }}
      />
      <span
        className="text-xs font-medium text-center leading-tight relative z-10"
        style={{
          color: hovered ? (light ? "#0a0a0a" : "#e5e5e5") : "#737373",
          transition: "color 0.25s ease",
        }}
      >
        {tech.name}
      </span>
    </div>
  );
}
