import localFont from "next/font/local";

export const display = localFont({
  src: "../../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

export const body = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 1000",
});
