import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prerender the page shell. HomeContent reads request headers and
  // streams the Weaverse page inside Suspense at request time.
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
