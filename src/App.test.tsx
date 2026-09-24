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

    fireEvent.click(screen.getByRole('button', { name: /start validating/i }));

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

  it('returns to the input screen when the user confirms leaving the report', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start validating/i }));

    fireEvent.change(screen.getByLabelText(/startup idea/i), {
      target: { value: 'A marketplace for used bikes' },
    });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(900 * 6);
    });

    fireEvent.click(screen.getByRole('button', { name: /back to start/i }));

    expect(screen.getByLabelText(/startup idea/i)).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
