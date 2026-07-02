import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MVPFeatureList } from './MVPFeatureList';

const data = {
  build: ['Core workflow'],
  avoid: ['Team collaboration'],
};

describe('MVPFeatureList', () => {
  it('renders build-first and avoid lists', () => {
    render(<MVPFeatureList data={data} />);
    expect(screen.getByText('Core workflow')).toBeInTheDocument();
    expect(screen.getByText('Team collaboration')).toBeInTheDocument();
  });
});
