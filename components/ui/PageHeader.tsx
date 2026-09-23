import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import type { Crumb } from "@/lib/schema";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
};

/** Top of every inner page: breadcrumbs plus the page's single h1. */
export function PageHeader({ eyebrow, title, description, crumbs, children }: PageHeaderProps) {
  return (
    <header className="border-b border-border pb-12 pt-10 sm:pb-16 sm:pt-14">
      <Container>
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        {description && (
          <div className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</div>
        )}
        {children}
      </Container>
    </header>
  );
}
