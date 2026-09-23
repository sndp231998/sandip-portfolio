import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD for the page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-fg-soft">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-fg">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-border-strong">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
