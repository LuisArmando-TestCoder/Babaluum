import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE } from "@/content/site";
import { BRAND_NAVY } from "@/content/brand";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { body, display } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | El hub para mentes inquietas`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, locale: "es_CR", type: "website" },
};

export const viewport: Viewport = { themeColor: BRAND_NAVY };

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="es" className={`${display.variable} ${body.variable}`}>
    <body>
      <SmoothScroll>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </body>
  </html>
);

export default RootLayout;
