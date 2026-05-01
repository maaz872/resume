import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BackToTop } from "@/components/ui/BackToTop";
import { StickyMiniBar } from "@/components/ui/StickyMiniBar";
import { ScrollParticleFieldClient } from "@/components/ui/ScrollParticleFieldClient";
import { LoadingProvider } from "@/components/ui/LoadingScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maaz Ahmed | Mobile App Sales & Business Growth",
  description:
    "Interactive CV landing page for Maaz Ahmed, Mobile App Sales and Business Growth professional specializing in app and SaaS solution selling.",
  openGraph: {
    title: "Maaz Ahmed | Mobile App Sales & Business Growth",
    description:
      "Mobile App Sales and Business Growth professional specializing in app and SaaS solution selling.",
    type: "profile",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
  ],
};

const noFlashScript = `
(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var t=(s==='dark'||s==='light')?s:m;document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();
`.trim();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased relative">
        <LoadingProvider>
          <ThemeProvider>
            <ScrollParticleFieldClient />
            <ThemeToggle />
            <StickyMiniBar />
            <div className="relative" style={{ zIndex: 1 }}>{children}</div>
            <BackToTop />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
