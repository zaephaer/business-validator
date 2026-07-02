import { describe, it, expect } from 'vitest';
import { slugifyFileName } from './slugifyFileName';

describe('slugifyFileName', () => {
  it('converts spaces and punctuation to hyphens', () => {
    expect(slugifyFileName('A SaaS for freelancers: the fast way')).toBe('a-saas-for-freelancers-the-fast-way');
  });

  it('strips characters illegal in filenames', () => {
    expect(slugifyFileName('Idea / with \\ slashes & "quotes"')).toBe('idea-with-slashes-quotes');
  });

  it('truncates long input to the max length with no trailing hyphen', () => {
    const longIdea = 'a'.repeat(100);
    const result = slugifyFileName(longIdea, 10);
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result.endsWith('-')).toBe(false);
  });

  it('falls back to a default when the input has no valid characters', () => {
    expect(slugifyFileName('!!!///???')).toBe('validation-report');
  });
});
