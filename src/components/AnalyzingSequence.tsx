import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';

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
      // Final stage: state is already settled, we're just delaying onComplete
      // so the last message stays visible for its full dwell time.
      const finishTimer = setTimeout(onComplete, STAGE_DURATION_MS);
      return () => clearTimeout(finishTimer);
    }
    // flushSync forces a synchronous re-render so the new stage message is
    // visible before the next fake-timer advance in tests (React 18 batching
    // otherwise defers this update past the test assertion).
    const timer = setTimeout(() => {
      flushSync(() => setStageIndex((i) => i + 1));
    }, STAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stageIndex, onComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <motion.div
        className="h-16 w-16 rounded-full border-2 border-ink bg-lime shadow-brutal"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
        style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
      />
      <motion.p
        key={stageIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-heading text-lg font-semibold"
      >
        {STAGES[stageIndex]}
      </motion.p>
    </div>
  );
}
