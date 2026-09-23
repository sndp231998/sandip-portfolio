/**
 * Placeholder mechanism.
 *
 * Any fact that has not been confirmed by Sandip is stored as a `Todo` instead
 * of being invented. In development, `<Placeholder>` renders a visible dashed
 * box describing what is missing. In production builds placeholders render
 * nothing and are excluded from JSON-LD, so unverified text is never published.
 *
 * To find everything that still needs real data:  grep -rn "todo(" content
 */
export type Todo = { readonly __todo: true; readonly hint: string };

export type Maybe<T> = T | Todo;

export function todo(hint: string): Todo {
  return { __todo: true, hint };
}

export function isTodo(value: unknown): value is Todo {
  return typeof value === "object" && value !== null && "__todo" in value;
}

/** Returns the value, or `undefined` when it is still a placeholder. */
export function known<T>(value: Maybe<T> | undefined): T | undefined {
  return value === undefined || isTodo(value) ? undefined : value;
}

export const showPlaceholders = process.env.NODE_ENV !== "production";
