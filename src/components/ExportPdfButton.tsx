import type { RefObject } from 'react';
import html2pdf from 'html2pdf.js';

interface Props {
  targetRef: RefObject<HTMLDivElement>;
  fileName: string;
}

export function ExportPdfButton({ targetRef, fileName }: Props) {
  function handleExport() {
    if (!targetRef.current) return;
    html2pdf()
      .set({ filename: fileName, margin: 0.4, jsPDF: { format: 'letter' } })
      .from(targetRef.current)
      .save();
  }

  return (
    <button type="button" className="export-pdf-button" onClick={handleExport}>
      Export PDF
    </button>
  );
}
