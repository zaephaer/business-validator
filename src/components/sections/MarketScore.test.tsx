import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarketScore } from './MarketScore';

const data = {
  score: 8,
  reasoning: 'Strong timing and clear demand signals.',
  successFactors: ['Fast onboarding', 'Clear differentiation'],
  risks: ['Crowded category', 'Slow enterprise sales cycles'],
};

describe('MarketScore', () => {
  it('renders the score, reasoning, success factors, and risks', () => {
    render(<MarketScore data={data} />);
    expect(screen.getByText('8/10')).toBeInTheDocument();
    expect(screen.getByText(data.reasoning)).toBeInTheDocument();
    expect(screen.getByText('Fast onboarding')).toBeInTheDocument();
    expect(screen.getByText('Crowded category')).toBeInTheDocument();
  });
});
