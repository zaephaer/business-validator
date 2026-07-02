import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const STAGES = [
  'Scanning competitors...',
  'Scoring market opportunity...',
  'Modeling monetization options...',
  'Building financial projections...',
  'Assembling your report...',
];

const STAGE_DURATION_MS = 900;

interface Props {
  onComplete: () => void;
}

export function AnalyzingSequence({ onComplete }: Props) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => {
      flushSync(() => {
        setStageIndex((i) => i + 1);
      });
    }, STAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stageIndex, onComplete]);

  return (
    <div className="analyzing-sequence">
      <div className="analyzing-sequence__spinner" />
      <p>{STAGES[stageIndex]}</p>
    </div>
  );
}
