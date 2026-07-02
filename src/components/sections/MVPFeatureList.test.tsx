import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MVPFeatureList } from './MVPFeatureList';

const data = {
  build: ['Core workflow', 'Simple onboarding', 'Basic analytics'],
  avoid: ['Team collaboration', 'Custom branding', 'Native mobile apps'],
};

describe('MVPFeatureList', () => {
  it('renders every build-first and avoid item', () => {
    render(<MVPFeatureList data={data} />);
    data.build.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
    data.avoid.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });
});
