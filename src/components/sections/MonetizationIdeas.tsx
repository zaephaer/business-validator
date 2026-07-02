import type { Report } from '../../types/report';

interface Props {
  data: Report['monetization'];
}

export function MonetizationIdeas({ data }: Props) {
  return (
    <section id="monetization" className="report-section">
      <h2>3. Monetization Ideas</h2>
      <table className="monetization-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Revenue Potential</th>
            <th>Complexity</th>
            <th>Pricing Strategy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((model) => (
            <tr key={model.name}>
              <td>{model.name}</td>
              <td>{model.revenuePotential}</td>
              <td>{model.complexity}</td>
              <td>{model.pricingStrategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
