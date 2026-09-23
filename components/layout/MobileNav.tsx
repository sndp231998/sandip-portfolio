"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MenuIcon } from "@/components/ui/Icons";
import type { NavItem } from "@/lib/navigation";

/**
 * Mobile menu built on <details>, so it opens and closes without JavaScript.
 * The client code only closes it after navigation and on Escape.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details
      ref={ref}
      className="group relative md:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary
        aria-label="Menu"
        className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-lg text-fg-soft hover:bg-surface-2"
      >
        <MenuIcon />
      </summary>
      <nav
        aria-label="Mobile"
        className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border bg-surface p-2 shadow-lg"
      >
        <ul>
          <li>
            <Link href="/" className="block rounded-md px-3 py-2 text-sm text-fg-soft hover:bg-surface-2 hover:text-fg">
              Home
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="block rounded-md px-3 py-2 text-sm text-fg-soft hover:bg-surface-2 hover:text-fg aria-[current=page]:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
