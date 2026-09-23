import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Self-contained server bundle in .next/standalone (used by the Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names are strings so they work with Turbopack.
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
