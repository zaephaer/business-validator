import type { Report } from '../../types/report';

interface Props {
  data: Report['competitorScan'];
}

export function CompetitorScan({ data }: Props) {
  return (
    <section id="competitors" className="report-section">
      <h2>2. Competitor Scan</h2>
      <h3>Direct Competitors</h3>
      <ul>
        {data.direct.map((c) => (
          <li key={c.name}>
            <strong>{c.name}</strong> — {c.strength}; {c.weakness}
          </li>
        ))}
      </ul>
      <h3>Indirect Alternatives</h3>
      <ul>
        {data.indirect.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <h3>Unserved Needs</h3>
      <ul>
        {data.unservedNeeds.map((need) => (
          <li key={need}>{need}</li>
        ))}
      </ul>
      <h3>Market Gaps</h3>
      <ul>
        {data.gaps.map((gap) => (
          <li key={gap}>{gap}</li>
        ))}
      </ul>
    </section>
  );
}
