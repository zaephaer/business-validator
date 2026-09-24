import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportPage } from './ReportPage';
import { buildReport } from '../mock/generateReport';

describe('ReportPage', () => {
  it('renders every report section for a full report', () => {
    const report = buildReport('A marketplace for used bikes');
    render(<ReportPage report={report} onBackToStart={() => {}} />);

    expect(screen.getByText(/1\. Market Score/)).toBeInTheDocument();
    expect(screen.getByText(/2\. Competitor Scan/)).toBeInTheDocument();
    expect(screen.getByText(/3\. Monetization Ideas/)).toBeInTheDocument();
    expect(screen.getByText(/4\. MVP Feature List/)).toBeInTheDocument();
    expect(screen.getByText(/5\. Launch Strategy/)).toBeInTheDocument();
    expect(screen.getByText(/6\. Viral Hooks/)).toBeInTheDocument();
    expect(screen.getByText(/7\. Business Model Canvas/)).toBeInTheDocument();
    expect(screen.getByText(/8\. SWOT Analysis/)).toBeInTheDocument();
    expect(screen.getByText(/9\. Financial Projections/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export pdf/i })).toBeInTheDocument();
    expect(screen.getByText(/Startup Idea Validation Report/)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows a confirmation dialog and calls onBackToStart when the user confirms', () => {
    const onBackToStart = vi.fn();
    const report = buildReport('A marketplace for used bikes');
    render(<ReportPage report={report} onBackToStart={onBackToStart} />);

    fireEvent.click(screen.getByRole('button', { name: /back to start/i }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /discard/i }));

    expect(onBackToStart).toHaveBeenCalled();
  });

  it('does not call onBackToStart when the user cancels the confirmation', () => {
    const onBackToStart = vi.fn();
    const report = buildReport('A marketplace for used bikes');
    render(<ReportPage report={report} onBackToStart={onBackToStart} />);

    fireEvent.click(screen.getByRole('button', { name: /back to start/i }));
    fireEvent.click(screen.getByRole('button', { name: /keep editing/i }));

    expect(onBackToStart).not.toHaveBeenCalled();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});
