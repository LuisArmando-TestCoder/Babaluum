import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  sassOptions: { loadPaths: [path.join(process.cwd(), "src/styles")] },
};

export default config;
