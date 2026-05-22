"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RevealWord from "./RevealWord";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import Image from "next/image";

interface Photo { src: string; alt: string }

const photos: Photo[] = [
  { src: "/1.jpg", alt: "Personal photo 1" },
  { src: "/2.jpg", alt: "Personal photo 2" },
  { src: "/3.jpg", alt: "Personal photo 3" },
  { src: "/4.jpg", alt: "Personal photo 4" },
  { src: "/5.jpg", alt: "Personal photo 5" },
  { src: "/6.jpg", alt: "Personal photo 6" },
  { src: "/7.jpg", alt: "Personal photo 7" },
];

const CLONE = 3;
const N     = photos.length;
const extended = [
  ...photos.slice(-CLONE),
  ...photos,
  ...photos.slice(0, CLONE),
];
const GAP = 6;

export default function PersonalGallery() {
  const [idx, setIdx]             = useState(CLONE);
  const [animated, setAnimated]   = useState(false);
  const [sliding, setSliding]     = useState(false);
  const [cardW, setCardW]         = useState(210);
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const firstCardRef  = useRef<HTMLDivElement | null>(null);
  const idxRef        = useRef(idx);
  idxRef.current      = idx;
  const slidingRef    = useRef(sliding);
  slidingRef.current  = sliding;
  const pausedRef     = useRef(false);
  const touchStartX   = useRef<number | null>(null);
  const touchStartY   = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (firstCardRef.current) setCardW(firstCardRef.current.offsetWidth);
    };
    measure();
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", measure); };
  }, []);

  /* Auto-play: slide right every 3 s */
  useEffect(() => {
    const id = setInterval(() => {
      if (slidingRef.current || pausedRef.current) return;
      setSliding(true);
      setAnimated(true);
      setIdx(prev => prev + 1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* Slide — always responds immediately; cancels any active animation */
  const slide = useCallback((dir: -1 | 1) => {
    if (slidingRef.current) {
      setAnimated(false);
      setSliding(false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSliding(true);
        setAnimated(true);
        setIdx(prev => prev + dir);
      }));
      return;
    }
    setSliding(true);
    setAnimated(true);
    setIdx(prev => prev + dir);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    const current = idxRef.current;
    let teleportTo: number | null = null;
    if (current >= CLONE + N) teleportTo = current - N;
    if (current < CLONE)      teleportTo = current + N;
    if (teleportTo !== null) {
      setAnimated(false);
      setIdx(teleportTo);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        setSliding(false);
      }));
    } else {
      setSliding(false);
    }
  }, []);

  /* Touch swipe */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pausedRef.current = true;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    pausedRef.current = false;
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      slide(dx > 0 ? -1 : 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [slide]);

  const translateX = -(idx * (cardW + GAP));

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevLightbox  = useCallback(() => setLightbox(i => i !== null ? (i - 1 + N) % N : null), []);
  const nextLightbox  = useCallback(() => setLightbox(i => i !== null ? (i + 1) % N : null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, prevLightbox, nextLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.24em] text-neutral-500 uppercase mb-4">
        07 — Personal
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-neutral-900 dark:text-white mb-10 sm:mb-14 leading-tight">
        <RevealWord text="Beyond the" className="block" />
        <RevealWord text="screen." className="block text-neutral-400 dark:text-neutral-700" delay={0.18} />
      </h2>

      {/* Carousel */}
      <div
        className="relative h-[240px] sm:h-[280px] lg:h-[320px]"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex absolute top-0 left-0 h-full"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: animated ? "transform 2s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
              willChange: "transform",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((photo, i) => {
              const realIdx = ((i - CLONE) % N + N) % N;
              const hasError = !!imgErrors[realIdx];
              return (
                <div
                  key={i}
                  ref={i === 0 ? el => { firstCardRef.current = el; } : undefined}
                  onClick={() => !hasError && setLightbox(realIdx)}
                  className="group relative h-full flex-shrink-0 overflow-hidden"
                  style={{ width: "min(210px, 44vw)", borderRadius: "6px", cursor: hasError ? "default" : "pointer", background: "#101012" }}
                >
                  {hasError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5M6.75 6h.008v.008H6.75V6z" />
                      </svg>
                      <span className="text-[10px] text-neutral-700 font-medium text-center px-3 break-all">{photo.src}</span>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 44vw, 210px"
                        onError={() => setImgErrors(prev => ({ ...prev, [realIdx]: true }))}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/28 transition-colors duration-300 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={() => slide(-1)} aria-label="Previous"
          className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.82)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)"}
        >
          <LuChevronLeft className="w-4 h-4" />
        </button>

        <button onClick={() => slide(1)} aria-label="Next"
          className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.82)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)"}
        >
          <LuChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-5">
        {photos.map((_, i) => {
          const isActive = ((idx - CLONE) % N + N) % N === i;
          return (
            <span key={i} className="rounded-full transition-all duration-500"
              style={{ width: isActive ? "20px" : "6px", height: "6px", background: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)" }}
            />
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pt-20 pb-8"
          style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-[80vw] max-h-[68vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <Image src={photos[lightbox].src} alt={photos[lightbox].alt}
              width={1200} height={900}
              className="max-w-full max-h-[60vh] object-contain rounded-xl"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)", width: "auto", height: "auto" }}
            />
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium tracking-widest tabular-nums">
              {lightbox + 1} / {N}
            </div>
          </div>
          <button onClick={closeLightbox}
            className="absolute top-[4.5rem] right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.16)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"}
          ><LuX className="w-4 h-4" /></button>
          <button onClick={e => { e.stopPropagation(); prevLightbox(); }}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.16)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"}
          ><LuChevronLeft className="w-5 h-5" /></button>
          <button onClick={e => { e.stopPropagation(); nextLightbox(); }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.16)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"}
          ><LuChevronRight className="w-5 h-5" /></button>
        </div>
      )}
    </div>
  );
}
