import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FinancialProjections } from './FinancialProjections';

const data = {
  revenueForecast: {
    bestCase: Array.from({ length: 12 }, (_, i) => 1000 + i * 100),
    baseCase: Array.from({ length: 12 }, (_, i) => 800 + i * 80),
    worstCase: Array.from({ length: 12 }, (_, i) => 500 + i * 50),
  },
  unitEconomics: { cac: 50, ltv: 200, ltvToCacRatio: 4, grossMarginPct: 70 },
  operatingCosts: { infrastructure: '$200-$800/mo' },
  milestones: ['Break-even once MRR covers costs'],
  investorSnapshot: { arrPotential: '$12,000 in year-one ARR' },
};

describe('FinancialProjections', () => {
  it('renders the forecast table, unit economics, costs, milestones, and snapshot', () => {
    render(<FinancialProjections data={data} />);
    expect(screen.getByText(/CAC: \$50/)).toBeInTheDocument();
    expect(screen.getByText(/LTV:CAC ratio: 4x/)).toBeInTheDocument();
    expect(screen.getByText(/infrastructure: \$200-\$800\/mo/)).toBeInTheDocument();
    expect(screen.getByText('Break-even once MRR covers costs')).toBeInTheDocument();
    expect(screen.getByText(/arrPotential: \$12,000 in year-one ARR/)).toBeInTheDocument();
  });
});
