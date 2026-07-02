import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExecutiveSummary } from './ExecutiveSummary';

const data = {
  verdict: 'Strong opportunity worth validating',
  why: 'Growing demand and clear monetization path.',
  targetCustomer: 'Busy professionals',
  coreProblem: 'No easy way to plan meals',
  valueProposition: 'A faster way to plan meals',
  recommendedModel: 'Tiered monthly subscription',
};

describe('ExecutiveSummary', () => {
  it('renders the verdict, why, and key facts', () => {
    render(<ExecutiveSummary data={data} ideaLabel="AI meal planner" />);
    expect(screen.getByText(/Strong opportunity worth validating/)).toBeInTheDocument();
    expect(screen.getByText(data.why)).toBeInTheDocument();
    expect(screen.getByText(data.targetCustomer)).toBeInTheDocument();
    expect(screen.getByText(/AI meal planner/)).toBeInTheDocument();
  });
});
