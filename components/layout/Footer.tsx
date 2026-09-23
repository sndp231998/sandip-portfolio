import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company, profile } from "@/content/profile";
import { footerNav } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="text-sm font-semibold text-fg">{profile.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {profile.jobTitle} from {profile.location.country}. Founder of{" "}
            <a href={company.url} rel="noopener" className="text-fg-soft underline decoration-border-strong underline-offset-4 hover:text-fg">
              {company.name}
            </a>
            .
          </p>
          {profile.socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {profile.socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="me noopener" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{group.title}</p>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-fg-soft hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono">sandipchapagain.com.np</p>
      </Container>
    </footer>
  );
}
