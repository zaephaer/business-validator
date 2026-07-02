export interface SectionOffset {
  id: string;
  top: number;
}

/**
 * Returns the id of the active section for the given scroll position.
 * `sections` must be sorted by `top` in ascending order (e.g. document order).
 */
export function determineActiveSection(sections: SectionOffset[], scrollY: number): string {
  let active = sections[0]?.id ?? '';
  for (const section of sections) {
    if (scrollY >= section.top - 80) {
      active = section.id;
    }
  }
  return active;
}
