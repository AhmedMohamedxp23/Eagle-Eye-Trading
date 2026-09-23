import {
  Archivo,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Cairo,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Arabic-script counterparts, swapped in for the Latin faces above via a
// CSS custom-property override scoped to html[dir="rtl"] — see globals.css.
export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["600", "700", "800"],
});

export const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable} ${cairo.variable} ${plexSansArabic.variable}`;
