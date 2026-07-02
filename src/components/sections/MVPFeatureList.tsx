import type { Report } from '../../types/report';

interface Props {
  data: Report['mvp'];
}

export function MVPFeatureList({ data }: Props) {
  return (
    <section id="mvp" className="report-section">
      <h2>4. MVP Feature List</h2>
      <h3>Build First</h3>
      <ul>
        {data.build.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h3>Do Not Build</h3>
      <ul>
        {data.avoid.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
