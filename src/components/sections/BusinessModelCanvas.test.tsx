import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BusinessModelCanvas } from './BusinessModelCanvas';
import type { CanvasBlock } from '../../types/report';

const data: Record<CanvasBlock, string[]> = {
  customerSegments: ['Busy professionals', 'Small business owners'],
  valuePropositions: ['Faster outcome'],
  channels: ['Product Hunt'],
  customerRelationships: ['Self-serve'],
  revenueStreams: ['Subscription fees', 'Usage-based charges'],
  keyActivities: ['Product development'],
  keyResources: ['Core technology'],
  keyPartners: ['Infrastructure providers'],
  costStructure: ['Cloud hosting', 'Payment processing fees'],
};

describe('BusinessModelCanvas', () => {
  it('renders all nine canvas blocks with their content', () => {
    render(<BusinessModelCanvas data={data} />);

    // Block labels
    expect(screen.getByText('Customer Segments')).toBeInTheDocument();
    expect(screen.getByText('Value Propositions')).toBeInTheDocument();
    expect(screen.getByText('Channels')).toBeInTheDocument();
    expect(screen.getByText('Customer Relationships')).toBeInTheDocument();
    expect(screen.getByText('Revenue Streams')).toBeInTheDocument();
    expect(screen.getByText('Key Activities')).toBeInTheDocument();
    expect(screen.getByText('Key Resources')).toBeInTheDocument();
    expect(screen.getByText('Key Partners')).toBeInTheDocument();
    expect(screen.getByText('Cost Structure')).toBeInTheDocument();
  });

  it('renders all customer segment items', () => {
    render(<BusinessModelCanvas data={data} />);
    data.customerSegments.forEach((segment) => {
      expect(screen.getByText(segment)).toBeInTheDocument();
    });
  });

  it('renders all revenue stream items', () => {
    render(<BusinessModelCanvas data={data} />);
    data.revenueStreams.forEach((stream) => {
      expect(screen.getByText(stream)).toBeInTheDocument();
    });
  });

  it('renders all cost structure items', () => {
    render(<BusinessModelCanvas data={data} />);
    data.costStructure.forEach((cost) => {
      expect(screen.getByText(cost)).toBeInTheDocument();
    });
  });

  it('renders items from all other canvas blocks', () => {
    render(<BusinessModelCanvas data={data} />);
    expect(screen.getByText('Faster outcome')).toBeInTheDocument();
    expect(screen.getByText('Product Hunt')).toBeInTheDocument();
    expect(screen.getByText('Self-serve')).toBeInTheDocument();
    expect(screen.getByText('Product development')).toBeInTheDocument();
    expect(screen.getByText('Core technology')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure providers')).toBeInTheDocument();
  });
});
