import type { Report } from '../../types/report';
import { heading2, heading3, list } from '../../styles/brutal';

interface Props {
  data: Report['competitorScan'];
}

export function CompetitorScan({ data }: Props) {
  return (
    <section id="competitors">
      <h2 className={heading2}>2. Competitor Scan</h2>
      <h3 className={heading3}>Direct Competitors</h3>
      <ul className={list}>
        {data.direct.map((c) => (
          <li key={c.name}>
            <strong>{c.name}</strong> — {c.strength}; {c.weakness}
          </li>
        ))}
      </ul>
      <h3 className={heading3}>Indirect Alternatives</h3>
      <ul className={list}>
        {data.indirect.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <h3 className={heading3}>Unserved Needs</h3>
      <ul className={list}>
        {data.unservedNeeds.map((need) => (
          <li key={need}>{need}</li>
        ))}
      </ul>
      <h3 className={heading3}>Market Gaps</h3>
      <ul className={list}>
        {data.gaps.map((gap) => (
          <li key={gap}>{gap}</li>
        ))}
      </ul>
    </section>
  );
}
