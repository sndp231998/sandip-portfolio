"use client";

import { Moon, Sun } from "@/components/ui/Icons";

/**
 * Light/dark switch. The initial theme is applied by an inline script in the
 * root layout before first paint, so this component only handles clicks and
 * needs no state (icons swap via the `dark:` variant — no hydration mismatch).
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
