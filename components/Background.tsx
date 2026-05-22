"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

const N       = 80;
const CONNECT = 145;
const MOUSE_R = 180;

export default function Background() {
  const { theme } = useTheme();
  const light      = theme === "light";
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const themeRef   = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const mouse = { x: W / 2, y: H / 2 };

    /* Size canvas buffer to match CSS display size */
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();

    const particles: Particle[] = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  Math.random() * 1.6 + 1.0,
    }));

    let raf: number;

    const tick = () => {
      const isLight = themeRef.current === "light";
      ctx.clearRect(0, 0, W, H);

      /* Update */
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < MOUSE_R && d > 1) {
          const f = ((MOUSE_R - d) / MOUSE_R) ** 2 * 0.018;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.1) { p.vx = p.vx / spd * 1.1; p.vy = p.vy / spd * 1.1; }
        p.x += p.vx;  p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > W) { p.x = W; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > H) { p.y = H; p.vy *= -1; }
      }

      /* Lines */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b    = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist >= CONNECT) continue;

          const mx   = (a.x + b.x) * 0.5;
          const my   = (a.y + b.y) * 0.5;
          const near = Math.max(0, 1 - Math.hypot(mouse.x - mx, mouse.y - my) / (MOUSE_R * 1.5));
          const fade = 1 - dist / CONNECT;

          if (near > 0.06) {
            ctx.strokeStyle = `rgba(6,182,212,${fade * (0.22 + near * 0.45)})`;
            ctx.lineWidth   = 0.7 + near;
          } else {
            ctx.strokeStyle = isLight
              ? `rgba(0,0,0,${fade * 0.18})`
              : `rgba(255,255,255,${fade * 0.25})`;
            ctx.lineWidth = 0.7;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      /* Dots */
      for (const p of particles) {
        const d    = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        const near = Math.max(0, 1 - d / MOUSE_R);

        /* Glow halo */
        if (near > 0.2) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5 + near * 12);
          halo.addColorStop(0, `rgba(6,182,212,${near * 0.45})`);
          halo.addColorStop(1, "rgba(6,182,212,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5 + near * 12, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isLight
          ? `rgba(0,0,0,${0.35 + near * 0.5})`
          : `rgba(255,255,255,${0.5 + near * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const bg = light ? "#f4f4f5" : "#0a0a0a";

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: bg, transition: "background 0.4s ease" }}
    >
      {/* Canvas must have explicit pixel dimensions via JS — CSS 100% sets display size */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
      />

      {/* Subtle indigo top accent */}
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: 480, pointerEvents: "none",
        background: light
          ? "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 100%)"
          : "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(99,102,241,0.09) 0%, transparent 100%)",
      }} />

      {/* Edge fades */}
      <div style={{ position:"absolute", top:0, bottom:0, left:0, width:"18%",   background:`linear-gradient(to right, ${bg}, transparent)`, transition:"background 0.4s ease" }} />
      <div style={{ position:"absolute", top:0, bottom:0, right:0, width:"18%",  background:`linear-gradient(to left, ${bg}, transparent)`,  transition:"background 0.4s ease" }} />
      <div style={{ position:"absolute", left:0, right:0, top:0, height:110,     background:`linear-gradient(to bottom, ${bg}, transparent)`, transition:"background 0.4s ease" }} />
      <div style={{ position:"absolute", left:0, right:0, bottom:0, height:160,  background:`linear-gradient(to top, ${bg}, transparent)`,    transition:"background 0.4s ease" }} />
    </div>
  );
}
