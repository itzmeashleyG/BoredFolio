"use client";

import { useRef, useEffect } from "react";
import RevealWord from "./RevealWord";

interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  description?: string;
  bullets?: string[];
  highlight?: boolean;
}

const timeline: TimelineEntry[] = [
  {
    period: "Expected 2026",
    title: "Diploma in Application Development",
    org: "University of Makati",
    description: "3rd Year | Consistent Dean's Lister AY 2024–2025 (1st & 2nd Sem)",
    highlight: true,
  },
  {
    period: "2024–2025",
    title: "On-the-Job Training",
    org: "Development Academy of the Philippines (DAP)",
    description: "Front-End Developer & UI/UX Designer",
    bullets: ["Gatepass Management System", "PHP (Laravel), Tailwind CSS, SQL", "QR code time-in/time-out feature"],
  },
  {
    period: "2025",
    title: "Web Design Champion",
    org: "UMAK Infotech Olympics",
    description: "Secured championship by designing and coding a responsive landing page under strict time constraints.",
    highlight: true,
  },
  {
    period: "2025",
    title: "Participant — I.T. Skills Olympics",
    org: "Regional Competition",
  },
  {
    period: "2021–2023",
    title: "Senior High School — STEM Track",
    org: "Pateros Catholic Senior High School",
    description: "Science, Technology, Engineering & Mathematics",
  },
];

const certifications = [
  {
    title: "Champion — Web Design",
    org: "UMAK Infotech Olympics",
    year: "2025",
  },
  {
    title: "Participant — I.T. Skills Olympics",
    org: "Regional Competition",
    year: "2025",
  },
  {
    title: "Consistent Dean's Lister",
    org: "University of Makati",
    year: "2024–2025",
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const certsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stagger = (ref: HTMLDivElement | null, sel: string, step: number) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            ref.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
              el.style.animation = `stagger-in 0.65s cubic-bezier(0.16,1,0.3,1) ${i * step}s both`;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(ref);
    };
    stagger(timelineRef.current, "[data-entry]", 0.09);
    stagger(certsRef.current,    "[data-cert]",  0.1);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      {/* Timeline */}
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 uppercase mb-4">
          04 — Education & Experience
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-neutral-900 dark:text-white mb-8 sm:mb-12 leading-tight">
          <RevealWord text="Background" />
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[6px] top-2 bottom-2 w-px bg-black/[0.08] dark:bg-white/[0.07]" />

          <div ref={timelineRef} className="flex flex-col gap-9">
            {timeline.map((entry, i) => (
              <div key={i} data-entry className="relative flex gap-6 pl-8">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 shrink-0 ${
                    entry.highlight
                      ? "bg-neutral-100 dark:bg-white border-neutral-100 dark:border-white"
                      : "bg-neutral-100 dark:bg-neutral-900 border-neutral-600"
                  }`}
                />

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400 dark:text-neutral-700 font-medium">{entry.period}</span>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">{entry.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">{entry.org}</p>
                  {entry.description && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5 leading-relaxed">
                      {entry.description}
                    </p>
                  )}
                  {entry.bullets && (
                    <ul className="flex flex-col gap-1 mt-1">
                      {entry.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-700"
                        >
                          <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications + CTA */}
      <div className="flex flex-col gap-8 lg:pt-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 uppercase mb-6">
            Certifications & Achievements
          </p>
          <div ref={certsRef} className="flex flex-col gap-3">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                data-cert
                className="flex items-start justify-between gap-4 bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.06] rounded-2xl px-5 py-4 hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-all duration-200"
              >
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">{cert.title}</h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">{cert.org}</p>
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-700 shrink-0 mt-0.5 font-medium">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-4 p-7 bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.09] dark:border-white/[0.08] rounded-3xl flex flex-col gap-4">
          <div>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">Interested in working together?</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
              Open to opportunities and collaborative projects.
            </p>
          </div>
          <a
            href="mailto:ash@laungayan.com"
            className="self-start inline-flex items-center gap-2 bg-white text-neutral-950 text-sm font-semibold rounded-full px-6 py-3 hover:bg-neutral-200 transition-all duration-200 active:scale-95"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
