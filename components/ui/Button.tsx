import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const styles = {
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "border border-border-strong bg-surface text-fg hover:border-muted",
  ghost: "px-2 text-fg-soft underline-offset-4 hover:text-fg hover:underline",
};

/** A link styled as a button. External URLs render as plain <a> with rel=noopener. */
export function ButtonLink({ href, variant = "primary", className, children }: ButtonLinkProps) {
  const cls = cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition",
    styles[variant],
    className,
  );
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
