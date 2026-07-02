import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SWOTAnalysis } from './SWOTAnalysis';

const data = {
  strengths: ['Fast MVP scope', 'Strong technical team'],
  weaknesses: ['Limited brand recognition', 'No prior customer base'],
  opportunities: ['Underserved segment', 'Emerging market trend'],
  threats: ['Crowded category', 'Aggressive competitor with funding'],
};

describe('SWOTAnalysis', () => {
  it('renders all four SWOT quadrants with all items', () => {
    render(<SWOTAnalysis data={data} />);

    // Assert all strengths
    data.strengths.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    // Assert all weaknesses
    data.weaknesses.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    // Assert all opportunities
    data.opportunities.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    // Assert all threats
    data.threats.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
