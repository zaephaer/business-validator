import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ViralHooks } from './ViralHooks';

const data = {
  headline: 'Stop doing it the hard way',
  heroCopy: 'Validated, simplified, ready in minutes.',
  launchPost: 'We built this because existing options were too slow.',
  coldOutreach: 'Hi, open to a quick look?',
  demoScript: '[0:00] The problem...',
};

describe('ViralHooks', () => {
  it('renders all five hook types', () => {
    render(<ViralHooks data={data} />);
    expect(screen.getByText(data.headline)).toBeInTheDocument();
    expect(screen.getByText(data.heroCopy)).toBeInTheDocument();
    expect(screen.getByText(data.launchPost)).toBeInTheDocument();
    expect(screen.getByText(data.coldOutreach)).toBeInTheDocument();
    expect(screen.getByText(data.demoScript)).toBeInTheDocument();
  });
});
