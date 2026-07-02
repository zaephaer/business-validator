import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReportPage } from './ReportPage';
import { buildReport } from '../mock/generateReport';

describe('ReportPage', () => {
  it('renders every report section for a full report', () => {
    const report = buildReport('A marketplace for used bikes');
    render(<ReportPage report={report} />);

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
});
