import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AnalyzingSequence } from './AnalyzingSequence';

describe('AnalyzingSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the first stage message immediately', () => {
    render(<AnalyzingSequence onComplete={() => {}} />);
    expect(screen.getByText('Scanning competitors...')).toBeInTheDocument();
  });

  it('cycles through stage messages over time', () => {
    render(<AnalyzingSequence onComplete={() => {}} />);
    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByText('Scoring market opportunity...')).toBeInTheDocument();
  });

  it('calls onComplete after the final stage', () => {
    const onComplete = vi.fn();
    render(<AnalyzingSequence onComplete={onComplete} />);
    act(() => {
      vi.advanceTimersByTime(900 * 5);
    });
    expect(onComplete).toHaveBeenCalled();
  });
});
