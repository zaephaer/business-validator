import { describe, it, expect } from 'vitest';
import { buildReport } from './generateReport';

describe('buildReport', () => {
  it('selects the marketplace business model bank for marketplace ideas', () => {
    const report = buildReport('A marketplace connecting freelance designers with startups');
    expect(report.executiveSummary.recommendedModel).toBe('Take-rate marketplace');
    expect(report.monetization[0].name).toBe('Transaction commission');
  });

  it('selects the health industry bank for health-related ideas', () => {
    const report = buildReport('An AI-powered meal planner for people with diabetes');
    expect(report.competitorScan.direct.map((c) => c.name)).toContain('Noom');
  });

  it('falls back to generic banks for ideas with no recognized keywords', () => {
    const report = buildReport('A tool for xyz');
    expect(report.executiveSummary.recommendedModel).toBe('Freemium with paid upgrade');
  });

  it('produces the same numeric outputs for the same idea (deterministic)', () => {
    const a = buildReport('A marketplace for vintage furniture');
    const b = buildReport('A marketplace for vintage furniture');
    expect(a.marketScore.score).toBe(b.marketScore.score);
    expect(a.financials.unitEconomics.cac).toBe(b.financials.unitEconomics.cac);
  });

  it('populates every top-level report section for any idea', () => {
    const report = buildReport('Something completely generic');
    expect(report.executiveSummary).toBeDefined();
    expect(report.marketScore).toBeDefined();
    expect(report.competitorScan.direct.length).toBeGreaterThan(0);
    expect(report.monetization.length).toBeGreaterThan(0);
    expect(report.mvp.build.length).toBe(5);
    expect(report.mvp.avoid.length).toBe(10);
    expect(report.launchStrategy.weeklyRoadmap.length).toBeGreaterThan(0);
    expect(report.viralHooks.headline).toContain('Something completely generic');
    expect(Object.keys(report.businessModelCanvas).length).toBe(9);
    expect(report.swot.strengths.length).toBeGreaterThan(0);
    expect(report.financials.revenueForecast.baseCase.length).toBe(12);
  });
});
