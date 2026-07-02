import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('walks from input to analyzing to report', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/startup idea/i), {
      target: { value: 'A marketplace for used bikes' },
    });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));

    expect(screen.getByText(/Scanning competitors/i)).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(900 * 6);
    });

    expect(screen.getByText(/1\. Market Score/)).toBeInTheDocument();
  });
});
