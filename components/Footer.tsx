export default function Footer() {
  return (
    <footer className="relative px-6 sm:px-10 md:px-14 py-10 max-w-7xl mx-auto">
      <div
        className="w-full h-px mb-8"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-5">
          <a
            href="mailto:ash@laungayan.com"
            className="text-xs text-neutral-500 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 tracking-wide"
          >
            ash@laungayan.com
          </a>
          <a
            href="https://github.com/itzmeashleyG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 tracking-wide"
          >
            GitHub ↗
          </a>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-600 tracking-wide">
          © 2026 Ashley Gonzales. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
