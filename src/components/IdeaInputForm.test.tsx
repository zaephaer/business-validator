import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IdeaInputForm } from './IdeaInputForm';

describe('IdeaInputForm', () => {
  it('disables submit until the idea field has content', () => {
    render(<IdeaInputForm onSubmit={() => {}} />);
    expect(screen.getByRole('button', { name: /validate my idea/i })).toBeDisabled();
  });

  it('calls onSubmit with the trimmed idea text', () => {
    const onSubmit = vi.fn();
    render(<IdeaInputForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/startup idea/i), { target: { value: '  A meal planner app  ' } });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));
    expect(onSubmit).toHaveBeenCalledWith('A meal planner app');
  });

  it('does not call onSubmit when the field is empty or whitespace', () => {
    const onSubmit = vi.fn();
    render(<IdeaInputForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/startup idea/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /validate my idea/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
