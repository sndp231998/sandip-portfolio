import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

/**
 * Global MDX element overrides (required by @next/mdx in the App Router).
 * Styling comes from the `.prose` wrapper; these add behaviour only.
 */
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} rel="noopener" {...props}>
        {children}
      </a>
    ),
  // Wide tables scroll inside their own box instead of widening the page on mobile.
  table: (props) => (
    <div className="overflow-x-auto" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  ),
  img: (props) => (
    <Image
      sizes="(min-width: 768px) 720px, 100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
