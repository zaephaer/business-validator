import type { Report } from '../../types/report';
import { heading2, table, tableCell, tableHeadCell } from '../../styles/brutal';

interface Props {
  data: Report['monetization'];
}

export function MonetizationIdeas({ data }: Props) {
  return (
    <section id="monetization">
      <h2 className={heading2}>3. Monetization Ideas</h2>
      <div className="mt-4 overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              <th className={tableHeadCell}>Model</th>
              <th className={tableHeadCell}>Revenue Potential</th>
              <th className={tableHeadCell}>Complexity</th>
              <th className={tableHeadCell}>Pricing Strategy</th>
            </tr>
          </thead>
          <tbody>
            {data.map((model) => (
              <tr key={model.name} className="odd:bg-cream">
                <td className={tableCell}>{model.name}</td>
                <td className={tableCell}>{model.revenuePotential}</td>
                <td className={tableCell}>{model.complexity}</td>
                <td className={tableCell}>{model.pricingStrategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
