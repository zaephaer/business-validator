import { motion } from 'framer-motion';
import type { Report } from '../../types/report';
import { heading2, heading3, list } from '../../styles/brutal';

interface Props {
  data: Report['marketScore'];
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreRing({ score }: { score: number }) {
  const offset = CIRCUMFERENCE - (score / 10) * CIRCUMFERENCE;
  return (
    <div className="relative inline-flex h-28 w-28 flex-shrink-0 items-center justify-center">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#16161622" strokeWidth="10" />
        <motion.circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="#C1F73A"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute font-heading text-xl font-bold">{score}/10</span>
    </div>
  );
}

export function MarketScore({ data }: Props) {
  return (
    <section id="market">
      <h2 className={heading2}>1. Market Score</h2>
      <div className="mt-4 flex flex-col items-start gap-4 rounded-xl border-2 border-ink bg-white p-5 shadow-brutal sm:flex-row sm:items-center">
        <ScoreRing score={data.score} />
        <p className="font-body text-sm text-ink/90">{data.reasoning}</p>
      </div>
      <h3 className={heading3}>Success Factors</h3>
      <ul className={list}>
        {data.successFactors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
      <h3 className={heading3}>Risks</h3>
      <ul className={list}>
        {data.risks.map((risk) => (
          <li key={risk}>{risk}</li>
        ))}
      </ul>
    </section>
  );
}
