import type { Report } from '../../types/report';

interface Props {
  data: Report['marketScore'];
}

export function MarketScore({ data }: Props) {
  return (
    <section id="market" className="report-section">
      <h2>1. Market Score</h2>
      <div className="score-badge">{data.score}/10</div>
      <p>{data.reasoning}</p>
      <h3>Success Factors</h3>
      <ul>
        {data.successFactors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
      <h3>Risks</h3>
      <ul>
        {data.risks.map((risk) => (
          <li key={risk}>{risk}</li>
        ))}
      </ul>
    </section>
  );
}
