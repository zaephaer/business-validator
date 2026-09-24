import type { Report } from '../../types/report';
import { heading2, heading3, list, table, tableCell, tableHeadCell } from '../../styles/brutal';

interface Props {
  data: Report['financials'];
}

export function FinancialProjections({ data }: Props) {
  return (
    <section id="financials">
      <h2 className={heading2}>9. Financial Projections</h2>
      <h3 className={heading3}>Revenue Forecast (12 months)</h3>
      <div className="mt-2 overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              <th className={tableHeadCell}>Month</th>
              <th className={tableHeadCell}>Best Case</th>
              <th className={tableHeadCell}>Base Case</th>
              <th className={tableHeadCell}>Worst Case</th>
            </tr>
          </thead>
          <tbody>
            {data.revenueForecast.baseCase.map((_, i) => (
              <tr key={i} className="odd:bg-cream">
                <td className={tableCell}>{i + 1}</td>
                <td className={tableCell}>${data.revenueForecast.bestCase[i].toLocaleString()}</td>
                <td className={tableCell}>${data.revenueForecast.baseCase[i].toLocaleString()}</td>
                <td className={tableCell}>${data.revenueForecast.worstCase[i].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className={heading3}>Unit Economics</h3>
      <ul className={list}>
        <li>CAC: ${data.unitEconomics.cac}</li>
        <li>LTV: ${data.unitEconomics.ltv}</li>
        <li>LTV:CAC ratio: {data.unitEconomics.ltvToCacRatio}x</li>
        <li>Gross margin: {data.unitEconomics.grossMarginPct}%</li>
      </ul>
      <h3 className={heading3}>Operating Costs</h3>
      <ul className={list}>
        {Object.entries(data.operatingCosts).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3 className={heading3}>Milestones</h3>
      <ul className={list}>
        {data.milestones.map((milestone) => (
          <li key={milestone}>{milestone}</li>
        ))}
      </ul>
      <h3 className={heading3}>Investor Snapshot</h3>
      <ul className={list}>
        {Object.entries(data.investorSnapshot).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
