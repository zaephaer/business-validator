import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MonetizationIdeas } from './MonetizationIdeas';

const data = [
  { name: 'Transaction commission', revenuePotential: 'High' as const, complexity: 'Medium' as const, pricingStrategy: '10-20% take rate' },
];

describe('MonetizationIdeas', () => {
  it('renders each monetization model as a row', () => {
    render(<MonetizationIdeas data={data} />);
    expect(screen.getByText('Transaction commission')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('10-20% take rate')).toBeInTheDocument();
  });
});
