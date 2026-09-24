import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Report } from '../types/report';
import { SidebarNav, type SidebarSection } from './SidebarNav';
import { ExportPdfButton } from './ExportPdfButton';
import { determineActiveSection } from '../utils/scrollspy';
import { slugifyFileName } from '../utils/slugifyFileName';
import { fadeUpItem, staggerContainer } from '../styles/motion';
import { ExecutiveSummary } from './sections/ExecutiveSummary';
import { MarketScore } from './sections/MarketScore';
import { CompetitorScan } from './sections/CompetitorScan';
import { MonetizationIdeas } from './sections/MonetizationIdeas';
import { MVPFeatureList } from './sections/MVPFeatureList';
import { LaunchStrategy } from './sections/LaunchStrategy';
import { ViralHooks } from './sections/ViralHooks';
import { BusinessModelCanvas } from './sections/BusinessModelCanvas';
import { SWOTAnalysis } from './sections/SWOTAnalysis';
import { FinancialProjections } from './sections/FinancialProjections';

const SECTIONS: SidebarSection[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'market', label: 'Market Score' },
  { id: 'competitors', label: 'Competitor Scan' },
  { id: 'monetization', label: 'Monetization' },
  { id: 'mvp', label: 'MVP Features' },
  { id: 'launch', label: 'Launch Strategy' },
  { id: 'hooks', label: 'Viral Hooks' },
  { id: 'canvas', label: 'Business Model Canvas' },
  { id: 'swot', label: 'SWOT' },
  { id: 'financials', label: 'Financials' },
];

interface Props {
  report: Report;
  onBackToStart: () => void;
}

export function ReportPage({ report, onBackToStart }: Props) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.offsetTop : 0 };
      });
      setActiveId(determineActiveSection(offsets, window.scrollY));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleNavigate(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleBack() {
    if (window.confirm('Discard this report and start a new idea?')) {
      onBackToStart();
    }
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <SidebarNav sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} onBack={handleBack} />
      <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-8 flex justify-end">
          <ExportPdfButton targetRef={containerRef} fileName={`${slugifyFileName(report.idea)}-validation-report.pdf`} />
        </div>
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="mx-auto max-w-3xl space-y-10"
        >
          <motion.div variants={fadeUpItem}>
            <ExecutiveSummary data={report.executiveSummary} ideaLabel={report.idea} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <MarketScore data={report.marketScore} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <CompetitorScan data={report.competitorScan} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <MonetizationIdeas data={report.monetization} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <MVPFeatureList data={report.mvp} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <LaunchStrategy data={report.launchStrategy} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <ViralHooks data={report.viralHooks} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <BusinessModelCanvas data={report.businessModelCanvas} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <SWOTAnalysis data={report.swot} />
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <FinancialProjections data={report.financials} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
