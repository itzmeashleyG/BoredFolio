"use client";
import { useRef, useEffect, useState } from "react";

export default function RevealWord({
  text,
  className,
  delay = 0,
  step = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: go
                ? `word-up 0.72s cubic-bezier(0.16,1,0.3,1) ${delay + i * step}s both`
                : "none",
              opacity: go ? undefined : 0,
              marginRight: i < words.length - 1 ? "0.28em" : 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
