import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarNav } from './SidebarNav';

const sections = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'market', label: 'Market Score' },
];

describe('SidebarNav', () => {
  it('renders a link for every section', () => {
    render(<SidebarNav sections={sections} activeId="summary" onNavigate={() => {}} />);
    expect(screen.getByText('Executive Summary')).toBeInTheDocument();
    expect(screen.getByText('Market Score')).toBeInTheDocument();
  });

  it('marks the active section', () => {
    render(<SidebarNav sections={sections} activeId="market" onNavigate={() => {}} />);
    expect(screen.getByText('Market Score')).toHaveClass('active');
  });

  it('calls onNavigate when a section link is clicked', () => {
    const onNavigate = vi.fn();
    render(<SidebarNav sections={sections} activeId="summary" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('Market Score'));
    expect(onNavigate).toHaveBeenCalledWith('market');
  });
});
