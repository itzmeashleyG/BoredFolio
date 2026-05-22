import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashley Nicole Gonzales — Developer",
  description:
    "Personal portfolio of Ashley Nicole Gonzales — UI/UX & front-end developer passionate about creating impactful, user-centric web and mobile applications.",
  openGraph: {
    title: "Ashley Nicole Gonzales — Developer",
    description: "UI/UX & front-end developer passionate about creating impactful, user-centric web applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}`,
          }}
        />
      </head>
      <body className="bg-zinc-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
