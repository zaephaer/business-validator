import type { Report } from '../../types/report';

interface Props {
  data: Report['financials'];
}

export function FinancialProjections({ data }: Props) {
  return (
    <section id="financials" className="report-section">
      <h2>9. Financial Projections</h2>
      <h3>Revenue Forecast (12 months)</h3>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Best Case</th>
            <th>Base Case</th>
            <th>Worst Case</th>
          </tr>
        </thead>
        <tbody>
          {data.revenueForecast.baseCase.map((_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>${data.revenueForecast.bestCase[i].toLocaleString()}</td>
              <td>${data.revenueForecast.baseCase[i].toLocaleString()}</td>
              <td>${data.revenueForecast.worstCase[i].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Unit Economics</h3>
      <ul>
        <li>CAC: ${data.unitEconomics.cac}</li>
        <li>LTV: ${data.unitEconomics.ltv}</li>
        <li>LTV:CAC ratio: {data.unitEconomics.ltvToCacRatio}x</li>
        <li>Gross margin: {data.unitEconomics.grossMarginPct}%</li>
      </ul>
      <h3>Operating Costs</h3>
      <ul>
        {Object.entries(data.operatingCosts).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3>Milestones</h3>
      <ul>
        {data.milestones.map((milestone) => (
          <li key={milestone}>{milestone}</li>
        ))}
      </ul>
      <h3>Investor Snapshot</h3>
      <ul>
        {Object.entries(data.investorSnapshot).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
