import { describe, it, expect } from 'vitest';
import { detectBusinessModel, detectIndustry } from './templateBanks';

describe('detectBusinessModel', () => {
  it('detects marketplace ideas', () => {
    expect(detectBusinessModel('A marketplace for used bikes')).toBe('marketplace');
  });

  it('detects subscription/SaaS ideas', () => {
    expect(detectBusinessModel('A SaaS app for freelancers')).toBe('subscription');
  });

  it('detects retail/physical product ideas', () => {
    expect(detectBusinessModel('A physical product for home brewing')).toBe('retail');
  });

  it('falls back to generic when no keyword matches', () => {
    expect(detectBusinessModel('A community for retirees')).toBe('generic');
  });
});

describe('detectIndustry', () => {
  it('detects health ideas', () => {
    expect(detectIndustry('An app for diabetes meal planning')).toBe('health');
  });

  it('detects fintech ideas', () => {
    expect(detectIndustry('A budgeting tool for fintech investors')).toBe('fintech');
  });

  it('detects AI ideas', () => {
    expect(detectIndustry('An AI-powered writing assistant')).toBe('ai');
  });

  it('detects education ideas', () => {
    expect(detectIndustry('An online course platform for students')).toBe('education');
  });

  it('falls back to generic when no keyword matches', () => {
    expect(detectIndustry('A tool for scheduling meetings')).toBe('generic');
  });
});
