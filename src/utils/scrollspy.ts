export interface SectionOffset {
  id: string;
  top: number;
}

export function determineActiveSection(sections: SectionOffset[], scrollY: number): string {
  let active = sections[0]?.id ?? '';
  for (const section of sections) {
    if (scrollY >= section.top - 80) {
      active = section.id;
    }
  }
  return active;
}
