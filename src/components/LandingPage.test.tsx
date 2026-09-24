import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the hero and how-it-works steps', () => {
    render(<LandingPage onGetStarted={() => {}} />);
    expect(screen.getByRole('heading', { name: /know if your startup idea is worth building/i })).toBeInTheDocument();
    expect(screen.getByText('Describe your idea')).toBeInTheDocument();
    expect(screen.getByText('We analyze it')).toBeInTheDocument();
    expect(screen.getByText('Get your report')).toBeInTheDocument();
  });

  it('calls onGetStarted when the CTA is clicked', () => {
    const onGetStarted = vi.fn();
    render(<LandingPage onGetStarted={onGetStarted} />);
    fireEvent.click(screen.getByRole('button', { name: /start validating/i }));
    expect(onGetStarted).toHaveBeenCalled();
  });
});
