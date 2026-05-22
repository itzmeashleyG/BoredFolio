"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center gap-2 bg-white/[0.06] dark:bg-white/[0.06] border border-white/[0.08] dark:border-white/[0.08] light:bg-black/[0.06] light:border-black/[0.1] backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-white/[0.12] dark:hover:bg-white/[0.12] transition-all duration-200 cursor-pointer min-h-[36px] sm:min-h-[38px]"
      style={{
        background: theme === "light" ? "rgba(0,0,0,0.06)" : undefined,
        border: theme === "light" ? "1px solid rgba(0,0,0,0.1)" : undefined,
      }}
    >
      {theme === "dark" ? (
        <HiSun className="w-4 h-4 text-neutral-300" />
      ) : (
        <HiMoon className="w-4 h-4 text-neutral-600" />
      )}
      <span
        className="text-xs sm:text-sm font-medium whitespace-nowrap"
        style={{ color: theme === "light" ? "#404040" : "#d4d4d4" }}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
