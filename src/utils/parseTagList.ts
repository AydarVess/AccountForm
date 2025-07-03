import type { Tag } from "@/types/account";

export function parseTagList(input: string): Tag[] {
  return input
    .split(";")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 50)
    .map((text) => ({ text }));
}
