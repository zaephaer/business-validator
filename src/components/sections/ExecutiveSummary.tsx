import type { Report } from '../../types/report';
import { card, heading2 } from '../../styles/brutal';

interface Props {
  data: Report['executiveSummary'];
  ideaLabel: string;
}

export function ExecutiveSummary({ data, ideaLabel }: Props) {
  return (
    <section id="summary">
      <p className="font-heading text-xs font-bold uppercase tracking-widest text-ink/50">
        Startup Idea Validation Report
      </p>
      <h1 className={`${heading2} mt-1 text-3xl sm:text-4xl`}>&quot;{ideaLabel}&quot;</h1>
      <div className={`${card} mt-5 bg-lime`}>
        <div className="font-heading text-lg font-bold">VERDICT: {data.verdict}</div>
        <p className="mt-2 font-body text-sm">{data.why}</p>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={card}>
          <dt className="font-heading text-xs font-bold uppercase tracking-wide text-ink/50">Target Customer</dt>
          <dd className="mt-1 font-body text-sm">{data.targetCustomer}</dd>
        </div>
        <div className={card}>
          <dt className="font-heading text-xs font-bold uppercase tracking-wide text-ink/50">Core Problem</dt>
          <dd className="mt-1 font-body text-sm">{data.coreProblem}</dd>
        </div>
        <div className={card}>
          <dt className="font-heading text-xs font-bold uppercase tracking-wide text-ink/50">Value Proposition</dt>
          <dd className="mt-1 font-body text-sm">{data.valueProposition}</dd>
        </div>
        <div className={card}>
          <dt className="font-heading text-xs font-bold uppercase tracking-wide text-ink/50">
            Recommended Business Model
          </dt>
          <dd className="mt-1 font-body text-sm">{data.recommendedModel}</dd>
        </div>
      </dl>
    </section>
  );
}
