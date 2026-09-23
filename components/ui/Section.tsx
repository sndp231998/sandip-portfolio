import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** Small monospace label above the heading, e.g. "01 / About". */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  /** Optional element aligned to the right of the heading (e.g. a "View all" link). */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** A titled page section: <section> labelled by its h2 heading. */
export function Section({ id, eyebrow, title, description, action, className, children }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-20 py-16 sm:py-20", className)}>
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {title}
            </h2>
            {description && <div className="mt-3 text-base leading-relaxed text-muted">{description}</div>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
