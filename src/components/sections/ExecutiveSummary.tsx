import type { Report } from '../../types/report';

interface Props {
  data: Report['executiveSummary'];
  ideaLabel: string;
}

export function ExecutiveSummary({ data, ideaLabel }: Props) {
  return (
    <section id="summary" className="report-section">
      <div className="report-section__eyebrow">Startup Idea Validation Report</div>
      <h1 className="report-section__idea">&quot;{ideaLabel}&quot;</h1>
      <div className="verdict-card">
        <div className="verdict-card__title">VERDICT: {data.verdict}</div>
        <p>{data.why}</p>
      </div>
      <dl className="summary-facts">
        <dt>Target Customer</dt>
        <dd>{data.targetCustomer}</dd>
        <dt>Core Problem</dt>
        <dd>{data.coreProblem}</dd>
        <dt>Value Proposition</dt>
        <dd>{data.valueProposition}</dd>
        <dt>Recommended Business Model</dt>
        <dd>{data.recommendedModel}</dd>
      </dl>
    </section>
  );
}
