import { describe, it, expect } from 'vitest';
import { determineActiveSection } from './scrollspy';

describe('determineActiveSection', () => {
  const sections = [
    { id: 'summary', top: 0 },
    { id: 'market', top: 500 },
    { id: 'competitors', top: 1000 },
  ];

  it('returns the first section when scrolled to the top', () => {
    expect(determineActiveSection(sections, 0)).toBe('summary');
  });

  it('returns the section whose offset has been passed', () => {
    expect(determineActiveSection(sections, 520)).toBe('market');
  });

  it('returns the last matching section when multiple thresholds are passed', () => {
    expect(determineActiveSection(sections, 1050)).toBe('competitors');
  });

  it('returns an empty string when there are no sections', () => {
    expect(determineActiveSection([], 100)).toBe('');
  });
});
