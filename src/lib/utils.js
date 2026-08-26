/** Tiny className joiner — no clsx dependency. */
export function cn(...parts) {
  return parts
    .flatMap((part) => {
      if (!part) return [];
      if (typeof part === "string") return [part];
      if (Array.isArray(part)) return part.filter(Boolean);
      if (typeof part === "object") {
        return Object.entries(part)
          .filter(([, on]) => Boolean(on))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}
