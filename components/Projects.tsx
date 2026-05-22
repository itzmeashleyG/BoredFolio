"use client";

import { useRef, useEffect, useState } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPhp,
  SiMysql,
  SiFigma,
  SiLaravel,
  SiTailwindcss,
} from "react-icons/si";
import { HiQrCode, HiDevicePhoneMobile } from "react-icons/hi2";
import type { IconType } from "react-icons";
import RevealWord from "./RevealWord";

interface TechMeta {
  icon: IconType;
  color: string;
}

const techMap: Record<string, TechMeta> = {
  "HTML":              { icon: SiHtml5,            color: "#E34F26" },
  "CSS":               { icon: SiCss,              color: "#1572B6" },
  "JavaScript":        { icon: SiJavascript,        color: "#F7DF1E" },
  "PHP":               { icon: SiPhp,              color: "#777BB4" },
  "MySQL":             { icon: SiMysql,            color: "#4479A1" },
  "SQL":               { icon: SiMysql,            color: "#4479A1" },
  "Figma":             { icon: SiFigma,            color: "#F24E1E" },
  "Laravel":           { icon: SiLaravel,          color: "#FF2D20" },
  "Tailwind CSS":      { icon: SiTailwindcss,      color: "#06B6D4" },
  "QR Code":           { icon: HiQrCode,           color: "#a1a1aa" },
  "Responsive Design": { icon: HiDevicePhoneMobile, color: "#a1a1aa" },
};

interface Project {
  title: string;
  type: string;
  role: string;
  context: string;
  description: string;
  achievements: string[];
  tech: string[];
  accentClass: string;
  image?: string;
  imageFit?: "cover" | "contain";
}

const projects: Project[] = [
  {
    title: "LDCDentSys",
    type: "Thesis Project",
    role: "UI/UX & Front-End Developer",
    context: "Academic",
    description:
      "A responsive web-based dental clinic appointment system designed to streamline patient scheduling and secure record management.",
    achievements: [
      "Built responsive UI with HTML, CSS & JavaScript",
      "Integrated PHP & MySQL (XAMPP) back-end",
      "Designed complete user experience in Figma",
      "Managed patient records with secure CRUD operations",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Figma"],
    accentClass: "from-neutral-800 via-[#141414] to-[#0a0a0a]",
    image: "/dental.jpg",
  },
  {
    title: "Gatepass Management System",
    type: "OJT Project",
    role: "Front-End Developer & UI/UX Designer",
    context: "Development Academy of the Philippines",
    description:
      "A responsive facility access control system with QR code-based attendance tracking to streamline entry and exit management.",
    achievements: [
      "Developed with PHP (Laravel) & Tailwind CSS",
      "Implemented QR code time-in/time-out tracking",
      "Designed responsive UI for all screen sizes",
      "Connected SQL database for real-time access logs",
    ],
    tech: ["Laravel", "PHP", "Tailwind CSS", "SQL", "QR Code"],
    accentClass: "from-zinc-800 via-[#141414] to-[#0a0a0a]",
    image: "/gatepass.jpg",
  },
  {
    title: "UMAK Infotech Olympics",
    type: "Competition",
    role: "Champion — Web Design 2025",
    context: "University Competition",
    description:
      "Secured the championship title by designing and coding a fully responsive landing page under strict time constraints.",
    achievements: [
      "Champion — Web Design Category (2025)",
      "Full design-to-code under time pressure",
      "Pure HTML & CSS, no external frameworks",
      "Resolved layout issues on the fly",
    ],
    tech: ["HTML", "CSS", "Responsive Design"],
    accentClass: "from-stone-800 via-[#141414] to-[#0a0a0a]",
    image: "/olympic.jpg",
    imageFit: "contain",
  },
];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          grid.querySelectorAll<HTMLElement>("[data-card]").forEach((el, i) => {
            el.style.animation = `stagger-in 0.72s cubic-bezier(0.16,1,0.3,1) ${i * 0.13}s both`;
          });
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 uppercase mb-4">
        03 — Projects
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-neutral-900 dark:text-white mb-10 sm:mb-14 leading-tight">
        <RevealWord text="Journey" className="block" />
        <RevealWord text="Experience." className="block text-neutral-400 dark:text-neutral-600" delay={0.18} />
      </h2>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerGo, setBannerGo] = useState(false);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBannerGo(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      data-card
      className="group flex flex-col bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.07] hover:border-black/[0.14] dark:hover:border-white/[0.14] rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Banner — mask-wipe reveal */}
      <div ref={bannerRef} style={{ overflow: "hidden" }}>
      <div
        className={`h-48 bg-gradient-to-br ${project.accentClass} relative overflow-hidden flex items-end p-5`}
        style={{
          animation: bannerGo ? "banner-wipe 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both" : "none",
          transform: bannerGo ? undefined : "translateY(104%)",
        }}
      >
        {/* Dot grid — shows only when no image */}
        {!project.image && (
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
            }}
          />
        )}

        {/* Project screenshot */}
        {project.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full transition-transform duration-700 ${project.imageFit === "contain" ? "object-contain scale-[1.7] group-hover:scale-[2.0]" : "object-cover group-hover:scale-105"}`}
          />
        )}

        {/* Scrim so the badge stays readable over any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <span className="relative z-10 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-black/50 backdrop-blur-sm border border-black/[0.09] dark:border-white/[0.08] rounded-full px-3 py-1">
          {project.context}
        </span>
      </div>
      </div>{/* /banner wrapper */}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <p className="text-xs text-neutral-400 dark:text-neutral-700 font-medium mb-1">{project.type}</p>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{project.title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{project.role}</p>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.description}</p>

        <div>
          <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-700 uppercase tracking-wider mb-2.5">
            Achievements
          </p>
          <ul className="flex flex-col gap-1.5">
            {project.achievements.map((ach) => (
              <li key={ach} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700 shrink-0" />
                {ach}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack with icons */}
        <div className="mt-auto pt-4 border-t border-black/[0.06] dark:border-white/[0.05]">
          <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-700 uppercase tracking-wider mb-2.5">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const meta = techMap[t];
              const Icon = meta?.icon;
              return (
                <span
                  key={t}
                  className="group/tag flex items-center gap-1.5 text-xs font-medium bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.07] dark:border-white/[0.06] hover:border-black/[0.12] dark:hover:border-white/[0.12] rounded-full pl-2 pr-3 py-1 transition-all duration-200"
                  style={
                    meta
                      ? ({
                          "--tag-color": meta.color,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {Icon && (
                    <Icon
                      className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/tag:scale-110"
                      style={{ color: meta.color }}
                    />
                  )}
                  <span className="text-neutral-500 dark:text-neutral-500 group-hover/tag:text-neutral-700 dark:group-hover/tag:text-neutral-300 transition-colors duration-200">
                    {t}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
