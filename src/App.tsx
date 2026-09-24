import { useState } from 'react';
import { motion } from 'framer-motion';
import { IdeaInputForm } from './components/IdeaInputForm';
import { AnalyzingSequence } from './components/AnalyzingSequence';
import { ReportPage } from './components/ReportPage';
import { generateReport } from './mock/generateReport';
import type { Report } from './types/report';

type Status = 'input' | 'analyzing' | 'report';

export function App() {
  const [status, setStatus] = useState<Status>('input');
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState<Report | null>(null);

  function handleSubmit(submittedIdea: string) {
    setIdea(submittedIdea);
    setStatus('analyzing');
  }

  function handleAnalyzingComplete() {
    generateReport(idea).then((result) => {
      setReport(result);
      setStatus('report');
    });
  }

  function handleBackToStart() {
    setIdea('');
    setReport(null);
    setStatus('input');
  }

  if (status === 'input') {
    return (
      <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <IdeaInputForm onSubmit={handleSubmit} />
      </motion.div>
    );
  }

  if (status === 'analyzing') {
    return (
      <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <AnalyzingSequence onComplete={handleAnalyzingComplete} />
      </motion.div>
    );
  }

  if (report) {
    return (
      <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <ReportPage report={report} onBackToStart={handleBackToStart} />
      </motion.div>
    );
  }

  return null;
}
