import { isTodo, showPlaceholders } from "@/lib/todo";

/**
 * Dev-only reminder for missing facts. Renders nothing in production builds,
 * so unverified or "TODO" text never reaches the public site.
 */
export function Placeholder({ todo, inline }: { todo: unknown; inline?: boolean }) {
  if (!showPlaceholders || !isTodo(todo)) return null;
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      data-placeholder
      className={
        inline
          ? "rounded border border-dashed border-amber-500/60 bg-amber-500/10 px-1.5 py-0.5 font-mono text-xs text-amber-700 dark:text-amber-300"
          : "my-3 block rounded-lg border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-3 font-mono text-xs leading-relaxed text-amber-800 dark:text-amber-200"
      }
    >
      <strong className="font-semibold">Placeholder:</strong> {todo.hint}
    </Tag>
  );
}
