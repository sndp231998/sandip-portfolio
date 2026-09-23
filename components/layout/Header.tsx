import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { mainNav } from "@/lib/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg"
          >
            SC
          </span>
          <span className="text-sm font-semibold tracking-tight text-fg">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  );
}
