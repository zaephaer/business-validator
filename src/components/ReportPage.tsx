import { useEffect, useRef, useState } from 'react';
import type { Report } from '../types/report';
import { SidebarNav, type SidebarSection } from './SidebarNav';
import { ExportPdfButton } from './ExportPdfButton';
import { determineActiveSection } from '../utils/scrollspy';
import { slugifyFileName } from '../utils/slugifyFileName';
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
}

export function ReportPage({ report }: Props) {
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

  return (
    <div className="report-page">
      <SidebarNav sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} />
      <div className="report-page__actions">
        <ExportPdfButton targetRef={containerRef} fileName={`${slugifyFileName(report.idea)}-validation-report.pdf`} />
      </div>
      <div className="report-page__content" ref={containerRef}>
        <ExecutiveSummary data={report.executiveSummary} ideaLabel={report.idea} />
        <MarketScore data={report.marketScore} />
        <CompetitorScan data={report.competitorScan} />
        <MonetizationIdeas data={report.monetization} />
        <MVPFeatureList data={report.mvp} />
        <LaunchStrategy data={report.launchStrategy} />
        <ViralHooks data={report.viralHooks} />
        <BusinessModelCanvas data={report.businessModelCanvas} />
        <SWOTAnalysis data={report.swot} />
        <FinancialProjections data={report.financials} />
      </div>
    </div>
  );
}
