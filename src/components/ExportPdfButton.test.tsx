import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { ExportPdfButton } from './ExportPdfButton';

const saveMock = vi.fn();
const fromMock = vi.fn(() => ({ save: saveMock }));
const setMock = vi.fn(() => ({ from: fromMock }));

vi.mock('html2pdf.js', () => ({
  default: vi.fn(() => ({ set: setMock })),
}));

describe('ExportPdfButton', () => {
  it('triggers html2pdf export when clicked', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <div>
        <div ref={ref}>content</div>
        <ExportPdfButton targetRef={ref} fileName="test-report.pdf" />
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /export pdf/i }));
    expect(setMock).toHaveBeenCalledWith(expect.objectContaining({ filename: 'test-report.pdf' }));
    expect(saveMock).toHaveBeenCalled();
  });
});
