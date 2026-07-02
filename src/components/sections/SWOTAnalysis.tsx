import type { Report } from '../../types/report';

interface Props {
  data: Report['swot'];
}

export function SWOTAnalysis({ data }: Props) {
  return (
    <section id="swot" className="report-section">
      <h2>8. SWOT Analysis</h2>
      <div className="swot-grid">
        <div>
          <h4>Strengths</h4>
          <ul>
            {data.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Weaknesses</h4>
          <ul>
            {data.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Opportunities</h4>
          <ul>
            {data.opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Threats</h4>
          <ul>
            {data.threats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
