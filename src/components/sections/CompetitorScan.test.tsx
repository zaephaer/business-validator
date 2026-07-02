import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompetitorScan } from './CompetitorScan';

const data = {
  direct: [{ name: 'Noom', strength: 'Strong brand', weakness: 'High price' }],
  indirect: [{ name: 'Spreadsheets', strength: 'Free', weakness: 'Manual' }],
  unservedNeeds: ['Faster onboarding'],
  gaps: ['No player wins on speed'],
};

describe('CompetitorScan', () => {
  it('renders direct, indirect competitors, unserved needs, and gaps', () => {
    render(<CompetitorScan data={data} />);
    expect(screen.getByText(/Noom/)).toBeInTheDocument();
    expect(screen.getByText('Spreadsheets')).toBeInTheDocument();
    expect(screen.getByText('Faster onboarding')).toBeInTheDocument();
    expect(screen.getByText('No player wins on speed')).toBeInTheDocument();
  });
});
