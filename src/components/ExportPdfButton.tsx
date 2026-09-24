import type { RefObject } from 'react';
import { motion } from 'framer-motion';
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
    <motion.button
      type="button"
      whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 0 #161616' }}
      whileTap={{ x: 0, y: 0, boxShadow: '2px 2px 0 0 #161616' }}
      className="rounded-xl border-2 border-ink bg-lime px-4 py-2 font-heading text-sm font-bold shadow-brutal"
      onClick={handleExport}
    >
      Export PDF
    </motion.button>
  );
}
