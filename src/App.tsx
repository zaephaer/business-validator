import { useState } from 'react';
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
    return <IdeaInputForm onSubmit={handleSubmit} />;
  }

  if (status === 'analyzing') {
    return <AnalyzingSequence onComplete={handleAnalyzingComplete} />;
  }

  if (report) {
    return <ReportPage report={report} onBackToStart={handleBackToStart} />;
  }

  return null;
}
